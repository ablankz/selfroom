import { HOST_ASSET } from "@/config-global";

type Work = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  isPersonal: boolean;
  startTime?: string;
  endTime?: string;
  devImg?: string;
  devName?: string;
}

const WORKS: Work[] = [
  {
    id: 'me',
    title: 'Portfolio Site',
    coverUrl: `${HOST_ASSET}/images/me/works/me.png`,
    description: 'Portfolio site. It includes my introduction, skill level, and simple demo apps, mainly backend.',
    isPersonal: true,
    startTime: '2023/10',
    endTime: '2023/11'
  },
  {
    id: 'medical_system',
    title: 'Medical field Schedule and other management systems',
    coverUrl: `${HOST_ASSET}/images/me/works/medical_system.png`,
    description: 'A system for the medical field that I am helping on the backend at EPOCH-NET, Inc. This is my first time working for EPOCH-NET, Inc. and I have been participating from the middle of the development process.',
    isPersonal: false,
    devImg: `${HOST_ASSET}/icons/works/epoch_net.svg`,
    devName: 'EPOCH-NET Inc.',
    startTime: '2023/07',
  }
]

export default WORKS;