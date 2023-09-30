type Link = {
  id: number;
  title: string;
  description: string;
  link: string;
  svg: string;
};

const LINK_ITEMS: Link[] = [
  {
    id: 0,
    title: 'Qiita',
    description: 'Article Submission Site: Qiita',
    link: 'https://qiita.com/ablankz',
    svg: 'ic_qiita',
  },
  {
    id: 1,
    title: 'GitHub',
    description: 'Source code control tools: Github',
    link: 'https://github.com/ablankz',
    svg: 'ic_github',
  },
  {
    id: 2,
    title: 'LinkedIn',
    description: 'Business SNS: LinkedIn',
    link: 'https://www.linkedin.com/in/%E5%81%A5%E5%A4%AA-%E6%9E%97-58399b293/',
    svg: 'ic_linked_in',
  },
  {
    id: 3,
    title: 'Zenn',
    description: 'Article Submission Site: Zenn',
    link: 'https://zenn.dev/blank',
    svg: 'ic_zenn',
  },
  {
    id: 4,
    title: 'My Blog',
    description: 'Blog Submission Site: SRBlog',
    link: 'https://blog.selfroom.net',
    svg: 'ic_blog',
  },
  {
    id: 5,
    title: 'Scrapbox',
    description: 'Information Sharing Tools: Scrapbox',
    link: 'https://scrapbox.io/selfroom/',
    svg: 'ic_scrapbox',
  },
];

export default LINK_ITEMS;