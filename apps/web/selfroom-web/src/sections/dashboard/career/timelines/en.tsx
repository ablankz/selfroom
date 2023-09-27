import Iconify from '@/components/iconify';
import SvgColor from '@/components/svg-color';

type TimelineType = {
  key: number;
  title: string;
  des: string;
  time: string;
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'inherit'
    | 'grey'
    | 'secondary';
  icon: React.ReactElement;
};

const TIMELINES: TimelineType[] = [
  {
    key: 1,
    title: 'Graduated from Ashiya Prefectural High School',
    des: 'After entering Kansai University, studied html, css, php (direct writing), (Vanilla) and javascript to create a simple web application. Used a rental server.',
    time: 'March 2021',
    color: 'primary',
    icon: <Iconify icon="material-symbols:web" width={24} />,
  },
  {
    key: 2,
    title: 'Entered Kansai University',
    des: "After entering the program, he continued his own study of programming, although there was a lot of classroom work (a little bit of c language) in the department's internal classes. In addition to the site, he started learning the c language. Studied competitive programming as well, with a little touch.",
    time: 'April 2021',
    color: 'grey',
    icon: <Iconify icon="nimbus:university" width={24} />,
  },
  {
    key: 3,
    title: 'first-year university student: Spring semester ends',
    des: 'Start to touch web frameworks (laravel, react). I change my main OS to ubuntu and study basic knowledge of command line. Changed server from rental server to vps.',
    time: 'August 2021',
    color: 'error',
    icon: <Iconify icon="mdi:ubuntu" width={24} />,
  },
  {
    key: 4,
    title: 'first-year university student: Beginning of fall semester',
    des: "I started a project with a friend and studied git and github for collaborative development and version control, and also studied db (postgresql), network (security), and networking (security). \
    Minimum knowledge of network (security). Studied the development content of the c language in university lectures.",
    time: '2021 Late September',
    color: 'info',
    icon: <Iconify icon="bi:git" width={24} />,
  },
  {
    key: 5,
    title: 'first-year university student: Fall semester ends',
    des: "Before the start of my second year, I learned network programming in c language. I was able to understand the internals of networking only to some extent. \
    I also learned about cloud computing (mainly AWS) and designed an infrastructure once, I built it but quickly removed it due to the cost.",
    time: 'February 2022',
    color: 'secondary',
    icon: <Iconify icon="tabler:network" width={24} />,
  },
  {
    key: 6,
    title: 'sophomore: Spring semester begins',
    des: 'Started learning about application design, even if not going as far as domain-driven design (ddd) while overriding the code in the core part of laravel (:mvc architecture),\
    Applied the essential parts of layered clean architecture to the project and gained some understanding of the concept of object thinking, the importance of abstraction, and maintainable code.',
    time: 'March 2022',
    color: 'success',
    icon: <Iconify icon="carbon:reference-architecture" width={24} />,
  },
  {
    key: 7,
    title: 'sophomore: Spring semester ends',
    des: 'Learn about restAPI design. Also, after learning about nextJs, which is a framework for the front end from react,\
    Started coding.',
    time: 'August 2022',
    color: 'warning',
    icon: <Iconify icon="dashicons:rest-api" width={24} />,
  },
  {
    key: 8,
    title: 'sophomore: Beginning of fall semester',
    des: 'I will try to learn competitive programming (atcoder) properly, which I gave up once, but also gave up (I want to be able to solve E problems smoothly eventually!) I will try to learn competitive programming (atcoder), which I gave up once.',
    time: '2022 Late September',
    color: 'grey',
    icon: (
      <SvgColor
        src={`/assets/icons/portfolio/ic_atcoder.svg`}
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    key: 9,
    title: 'sophomore: Fall semester ends',
    des: "Decided to take the Applied Information course at university. Started using NoSql (key-value type redis), webSocket, and 3D web programming (webGL, threeJs) for personal development (I haven't touched 3D much since then).",
    time: 'March 2023',
    color: 'error',
    icon: <Iconify icon="cib:redis" width={24} />,
  },
  {
    key: 10,
    title: 'junior: college student Spring semester begins',
    des: "I'm going to get some work experience as a part-timer at EPOCH-NET, Inc. Basically as a backend, but also a little bit on the front end, such as only the logic part around the response.\
    I started coding while studying nestJs for development reasons, and it was a good opportunity to learn more about git and dokcer. I also started cg programming (creating games using openGL (glut)) in university lectures,\
    He learned how to touch machine learning in python.",
    time: 'April 2023',
    color: 'info',
    icon: <Iconify icon="material-symbols:developer-mode" width={24} />,
  },
  {
    key: 11,
    title: 'junior: college student Spring semester ends',
    des: 'Begins to study RUST on his own. Starts using docker for personal application development.',
    time: 'August 2023',
    color: 'error',
    icon: <Iconify icon="logos:rust" width={24} />,
  },
  {
    key: 12,
    title: 'junior: college student Beginning of fall semester',
    des: 'I will be allowed to do the main back-end coding for one of the projects (the content will be confidential as it is in the development stage).\
    For the convenience of the project, create a definition file openapi.yaml according to openAPI and learn about swagger related to it. Start writing a portfolio for job hunting.',
    time: '2023 Late September',
    color: 'success',
    icon: <Iconify icon="file-icons:openapi" width={24} />,
  },
  {
    key: 13,
    title: 'from now on',
    des: 'First of all, I would like to create a backend for a web application using rust. Also, once I have learned rust to some extent, I would like to touch something close to hardware such as OS or embedded systems.',
    time: '2023 October ~',
    color: 'error',
    icon: (
      <SvgColor
        src={`/assets/icons/navbar/ic_introduction.svg`}
        sx={{ width: 24, height: 24 }}
      />
    ),
  },
];

export default TIMELINES;
