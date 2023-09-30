import { memo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Box } from '@mui/material';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HOST_ASSET } from '@/config-global';

type Props = {
  canvasTop: number;
  canvasLeft: number;
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

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0, 22);
    scene.add(camera);

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 8.0);
    directionalLight.position.set(1.8, 0.8, 0);

    // シーンに追加
    scene.add(directionalLight);

    //glTFの読み込み
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(`${HOST_ASSET}object/EarthHologram.glb`, function (gltf) {
      const obj = gltf.scene;
      const mesh = obj.children[0];
      scene.add(mesh);
    });

    const clock = new THREE.Clock();

    // アニメーション
    const tick = () => {
       // 時間取得
       const elapsedTime = clock.getElapsedTime();
 
       // カメラを円周上に周回させる
       camera.position.x = Math.sin(elapsedTime * 0.17) * 8.0;
       camera.position.z = Math.cos(elapsedTime * 0.17) * 8.0;
 
       camera.lookAt(
         Math.cos(elapsedTime),
         Math.sin(elapsedTime) * 0.2,
         Math.sin(elapsedTime) * 0.4
       );
      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

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
