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
    title: 'ポートフォリオサイト',
    coverUrl: `${HOST_ASSET}/images/me/works/me.png`,
    description: 'ポートフォリオサイト。自己紹介やスキルレベルなどや主にバックエンドをメインとした単純なデモアプリなどを載せています。',
    isPersonal: true,
    startTime: '2023/10',
    endTime: '2023/11'
  },
  {
    id: 'medical_system',
    title: '医療現場 スケジュール等管理システム',
    coverUrl: `${HOST_ASSET}/images/me/works/medical_system.png`,
    description: '株式会社EPOCH-NETにて主にバックエンドのお手伝いをさせてもらってる医療現場に向けたシステム。EPOCH-NETにて初めての実務で、開発の途中から参加させてもらってます。',
    isPersonal: false,
    devImg: `${HOST_ASSET}/icons/works/epoch_net.svg`,
    devName: '株式会社 EPOCH-NET',
    startTime: '2023/07'
  },
]

export default WORKS;