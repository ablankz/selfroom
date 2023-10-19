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
    title: 'ポートフォリオ',
    coverUrl: `${HOST_ASSET}/images/me/works/me.png`,
    description: 'ポートフォリオサイト。自己紹介やスキルレベルなどや主にバックエンドをメインとした単純なデモアプリなどを載せています。'
  },
  {
    id: 'medical_system',
    title: '医療現場 スケジュール等管理システム',
    coverUrl: `${HOST_ASSET}/images/me/works/medical_system.png`,
    description: '株式会社EPOCH-NETにて主にバックエンドのお手伝いをさせてもらってる医療現場に向けたシステム。EPOCH-NETにて初めての実務で、開発の途中から参加させてもらってます。'
  },
]

export default WORKS;