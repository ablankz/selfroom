// ----------------------------------------------------------------------

export const paths = {
  // DASHBOARD
  dashboard: {
    root: '/',
    career: '/career',
    skill: '/skill',
    works: '/works',
    work: (name: string) => `/works/${name}`,
    link: '/link',
    overview: '/overview',
    auth: '/auth',
    rawApi: `/raw-api`,
    chat: '/chat',
    setting: '/setting',
    profile: (id: string) => `/profile/${id}`,
    register: '/register',
  },
  oauthCallback: '/oauth-callback',
};
