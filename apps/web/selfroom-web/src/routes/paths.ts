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
    chat: '/chat-room',
    setting: '/setting',
    profile: (id: string) => `/profile/${id}`,
    register: '/auth/register',
    chatroom: {
      profile: (id: string) => `/chat-room/profile/${id}`,
      search: '/chat-room/search',
      create: '/chat-room/create',
      talk: (id: string) => `/chat-room/talk/${id}`,
    },
  },
  oauthCallback: '/oauth-callback',
};
