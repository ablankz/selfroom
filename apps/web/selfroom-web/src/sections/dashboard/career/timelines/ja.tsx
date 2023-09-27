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
    title: '県立芦屋高校卒業',
    des: '関西大学入学決定後、htmlやcss,php(直書き),(Vanilla)javascriptを勉強して簡易的なwebアプリケーション制作。サーバーはレンタルサーバーを使用。',
    time: '2021年 3月',
    color: 'primary',
    icon: <Iconify icon="material-symbols:web" width={24} />,
  },
  {
    key: 2,
    title: '関西大学入学',
    des: '入学後、学科内授業では座学が多かった(c言語を少し)が、プログラミングは自身の勉強を継続。サイトに加えて、c言語の学習開始。競技プログラミングも少し触る程度、勉強。',
    time: '2021年 4月',
    color: 'grey',
    icon: <Iconify icon="nimbus:university" width={24} />,
  },
  {
    key: 3,
    title: '大学1回生 春学期終了',
    des: 'webのフレームワーク(laravel, react)を触り始める。メインosをubuntuにして、コマンドラインなど基礎的な周辺知識の勉強をする。サーバーはレンタルサーバーからvpsに変更。',
    time: '2021年 8月',
    color: 'error',
    icon: <Iconify icon="mdi:ubuntu" width={24} />,
  },
  {
    key: 4,
    title: '大学1回生 秋学期開始',
    des: '友人とプロジェクトを始めることになり、共同開発・バージョン管理のため、git, githubを役割分担でインフラとバックエンドを担当することになったため、db(postgresql), \
    ネットワーク(セキュリティ)の最低限の知識をつける。大学の講義ではc言語の発展内容を学習。',
    time: '2021年 9月下旬',
    color: 'info',
    icon: <Iconify icon="bi:git" width={24} />,
  },
  {
    key: 5,
    title: '大学1回生 秋学期終了',
    des: '2回生が始まる前に、ネットワークプログラミングをc言語で学習。ネットワークの内部をある程度だけ理解できた。またクラウド(主にAWS)について学習して、一度はインフラを設計後、\
    構築してみたものの費用のためすぐに撤去。',
    time: '2022年 2月',
    color: 'secondary',
    icon: <Iconify icon="tabler:network" width={24} />,
  },
  {
    key: 6,
    title: '大学2回生 春学期開始',
    des: 'アプリケーションの設計について勉強を開始し、laravel(:mvcアーキテクチャ)のcore部分のコードをオーバーライドしながらドメイン駆動設計(ddd)までは行かずとも、\
    レイヤードクリーンアーキテクチャの本質部分をプロジェクトに適用させ、オブジェクト思考の概念、抽象化の重要性、保守性のあるコードをある程度理解した。',
    time: '2022年 3月',
    color: 'success',
    icon: <Iconify icon="carbon:reference-architecture" width={24} />,
  },
  {
    key: 7,
    title: '大学2回生 春学期終了',
    des: '作成していたwebアプリケーションを一つのサーバーでしていたのを一般的なweb, ap, dbに変更。restAPIの設計について学ぶ。またフロントはreactからそのフレームワークとなるnextJsを学習後、\
    コーディング開始。',
    time: '2022年 8月',
    color: 'warning',
    icon: <Iconify icon="dashicons:rest-api" width={24} />,
  },
  {
    key: 8,
    title: '大学2回生 秋学期開始',
    des: '一度断念した競技プログラミング(atcoder)をちゃんと勉強してみる、もまた断念（これもいずれはE問題くらいまでスラスラ解けるようになりたい!）。',
    time: '2022年 9月下旬',
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
    title: '大学2回生 秋学期終了',
    des: '大学ではコースが応用情報コースに決定。個人開発ではNoSql(キーバリュー型のredis)やwebSocket、3DWebプログラミング(webGL, threeJsそれぞれ経験)などを使い始める(3Dの方はこれ以降あんまり触ってない)。\
    ',
    time: '2023年 3月',
    color: 'error',
    icon: <Iconify icon="cib:redis" width={24} />,
  },
  {
    key: 10,
    title: '大学3回生 春学期開始',
    des: '株式会社EPOCH-NETでバイトとして実務経験をさせてもらうことになる。基本的にはバックエンドとして、フロントの方でもレスポンス周りのロジック部分のみなどは少しだけ触ることも。\
    開発の都合でnestJsの勉強をしながらコーディング開始。gitやdokcerについてより深く勉強する良い機会になった。また大学の講義ではcgプログラミング(openGL(glut)を使ったゲーム制作)、\
    pythonでの機械学習の触りを学習。',
    time: '2023年 4月',
    color: 'info',
    icon: <Iconify icon="material-symbols:developer-mode" width={24} />,
  },
  {
    key: 11,
    title: '大学3回生 春学期終了',
    des: '個人でrustの勉強を始める。個人でアプリケーションの開発を行うにもdockerを使うようになる。',
    time: '2023年 8月',
    color: 'error',
    icon: <Iconify icon="logos:rust" width={24} />,
  },
  {
    key: 12,
    title: '大学3回生 秋学期開始',
    des: 'ある案件でメインでバックエンドのコーディングをさせてもらう（開発段階なので内容は機密とする）。\
    案件の都合上、openAPIに沿った定義ファイルopenapi.yamlの作成とそれに関するswaggerについて知る。就活のためにポートフォリオを書き始める。',
    time: '2023年 9月下旬',
    color: 'success',
    icon: <Iconify icon="file-icons:openapi" width={24} />,
  },
  {
    key: 13,
    title: '今後',
    des: 'まずはrustを使ってwebアプリケーションのバックエンドを作成したい。また、ある程度rustを学べたところでosや組み込みなどハードに近いところを触っていきたい。',
    time: '2023年 10月~',
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
