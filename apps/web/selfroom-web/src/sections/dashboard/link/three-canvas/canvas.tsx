import { memo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Box } from '@mui/material';
// import * as dat from 'lil-gui';

const vertexShader = `
uniform float uWaveLength;
uniform vec2 uFrequency;
uniform float uTime;
uniform float uWaveSpeed;
uniform float uSmallWaveElevation;
uniform float uSmallWaveFrequency;
uniform float uSmallWaveSpeed;

varying float vElevation;

//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime * uWaveSpeed) * uWaveLength
                    * sin(modelPosition.z * uFrequency.y + uTime * uWaveSpeed) * uWaveLength;

    
    for(float i = 1.0; i <= 3.0; i++) {
      elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWaveFrequency * i, uTime * uSmallWaveSpeed))) * uSmallWaveElevation / i; 
    }             

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vElevation = elevation;
}
` as const;

const fragmentShader = `
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMutiplier;

varying float vElevation;

void main() {
    float mixStrengthColor = (vElevation + uColorOffset) * uColorMutiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrengthColor);
    gl_FragColor = vec4(color, 1.0);
}
` as const;

type Props = {
  canvasTop: number;
  canvasLeft: number;
};

type ColorType = {
  depthColor: string;
  surfaceColor: string;
};

export const Canvas = memo(({ canvasTop, canvasLeft }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    });

    const elm = mountRef.current;

    elm?.appendChild(renderer.domElement);

    // シーン
    const scene = new THREE.Scene();

    // サイズ
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 512, 512);

    // color
    const colorObject: ColorType = {
      depthColor: '#c3a2bc',
      surfaceColor: '#1b7950',
    };

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uWaveLength: { value: 0.092 },
        uFrequency: { value: new THREE.Vector2(4.803, 0.29) },
        uTime: { value: 0 },
        uWaveSpeed: { value: 2.638 },
        uDepthColor: { value: new THREE.Color(colorObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(colorObject.surfaceColor) },
        uColorOffset: { value: 0.127 },
        uColorMutiplier: { value: 10.575 },
        uSmallWaveElevation: { value: 0.341 },
        uSmallWaveFrequency: { value: 18.117 },
        uSmallWaveSpeed: { value: 0.28 },
      },
    });

    // const gui = new dat.GUI();

    // // デバッグ
    // gui
    //   .add(material.uniforms.uWaveLength, 'value')
    //   .min(0)
    //   .max(1)
    //   .step(0.001)
    //   .name('uWaveLength');
    // gui
    //   .add(material.uniforms.uFrequency.value, 'x')
    //   .min(0)
    //   .max(10)
    //   .step(0.001)
    //   .name('uFrequencyX');
    // gui
    //   .add(material.uniforms.uFrequency.value, 'y')
    //   .min(0)
    //   .max(10)
    //   .step(0.001)
    //   .name('uFrequencyY');
    // gui
    //   .add(material.uniforms.uWaveSpeed, 'value')
    //   .min(0)
    //   .max(4)
    //   .step(0.001)
    //   .name('uWaveSpeed');
    // gui
    //   .add(material.uniforms.uColorOffset, 'value')
    //   .min(0)
    //   .max(1)
    //   .step(0.001)
    //   .name('uColorOffset');
    // gui
    //   .add(material.uniforms.uColorMutiplier, 'value')
    //   .min(0)
    //   .max(10)
    //   .step(0.001)
    //   .name('uColorMutiplier');
    // gui
    //   .add(material.uniforms.uSmallWaveElevation, 'value')
    //   .min(0)
    //   .max(1)
    //   .step(0.001)
    //   .name('uSmallWaveElevation');
    // gui
    //   .add(material.uniforms.uSmallWaveFrequency, 'value')
    //   .min(0)
    //   .max(30)
    //   .step(0.001)
    //   .name('uSmallWaveFrequency');
    // gui
    //   .add(material.uniforms.uSmallWaveSpeed, 'value')
    //   .min(0)
    //   .max(4)
    //   .step(0.001)
    //   .name('uSmallWaveSpeed');

    // gui.addColor(colorObject, 'depthColor').onChange(() => {
    //   material.uniforms.uDepthColor.value.set(colorObject.depthColor);
    // });
    // gui.addColor(colorObject, 'surfaceColor').onChange(() => {
    //   material.uniforms.uSurfaceColor.value.set(colorObject.surfaceColor);
    // });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 1.0, 10);
    scene.add(camera);

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const sphereGeometry = new THREE.SphereGeometry(2, 100);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xEAF4FC });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(4, 5, -10);

    scene.add(sphere);

    // 平行光源
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 8.0);
    // directionalLight.position.set(1, 1, 0);
    // シーンに追加
    // scene.add(directionalLight);

    const light = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 4);
    pointLight.position.set(2.5, 3, -8)
    scene.add(pointLight);

    const clock = new THREE.Clock();

    const animate = () => {
      // 時間取得
      const elapsedTime = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsedTime;

      renderer.render(scene, camera);

      window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      elm?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <Box
        ref={mountRef}
        sx={{ position: 'fixed', top: canvasTop, left: canvasLeft }}
      />
    </>
  );
});
