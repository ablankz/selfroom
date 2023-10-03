import { HOST_ASSET } from "@/config-global";

type Work = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
}

const WORKS: Work[] = [
  {
    id: 'me',
    title: 'Portfolio',
    coverUrl: `${HOST_ASSET}images/me/works/me.png`,
    description: 'Portfolio site. It includes my introduction, skill level, and simple demo apps, mainly backend.'
  },
  {
    id: 'medical_system',
    title: 'Medical field Schedule and other management systems',
    coverUrl: `${HOST_ASSET}images/me/works/medical_system.png`,
    description: 'A system for the medical field that I am helping on the backend at EPOCH-NET, Inc. This is my first time working for EPOCH-NET, Inc. and I have been participating from the middle of the development process.'
  }
]

export default WORKS;