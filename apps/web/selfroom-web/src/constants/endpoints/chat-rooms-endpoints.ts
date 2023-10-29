import {
  GET_COMMON_PARAMS,
  GET_OPT_PARAMS,
  GET_CURSOR_OPT_PARAMS,
} from '../common-params';

export const CHAT_ROOMS_ENDPOINTS = {
  chatRooms: {
    find: {
      urlKey: '/chat-rooms/*',
      method: 'GET',
      url: (id: string) => `/chat-rooms/${id}`,
      comment: 'Obtaining chat room information',
    },
    get: {
      urlKey: '/chat-rooms',
      method: 'GET',
      url: '/chat-rooms',
      comment: 'Retrieving the chat room list',
      defaultParam: {
        ...GET_COMMON_PARAMS,
        ...GET_OPT_PARAMS,
        order: 'update',
        search_type: 'name',
        search: '検索文字',
        is_lock: 'all',
        is_favorite: 'all',
        categories: '1+2',
        category_select_type: 'any',
        total_count: 'with',
      },
    },
    create: {
      urlKey: '/chat-rooms',
      method: 'POST',
      url: '/chat-rooms',
      comment: 'Create a chat room',
      defaultBody: {
        name: 'new room',
        categories: 'This type is not supported',
        coverPhoto: 'This type is not supported',
        roomKey: 'key12345',
      },
    },
    chats: {
      find: {
        urlKey: '/chat-rooms/*/chats/*',
        method: 'GET',
        url: (roomId: string, id: string) =>
          `/chat-rooms/${roomId}/chats/${id}`,
        comment: 'Obtaining chat information',
      },
      get: {
        urlKey: '/chat-rooms/*/chats',
        method: 'GET',
        url: (roomId: string) => `/chat-rooms/${roomId}/chats`,
        comment: 'Retrieving the chat list',
        defaultParam: {
          ...GET_COMMON_PARAMS,
          ...GET_CURSOR_OPT_PARAMS,
        },
      },
      create: {
        urlKey: '/chat-rooms/*/chats',
        method: 'POST',
        url: (roomId: string) => `/chat-rooms/${roomId}/chats`,
        comment: 'Send Chat',
        defaultBody: {
          content: 'hello',
        },
      },
      update: {
        urlKey: '/chat-rooms/*/chats/*',
        method: 'PUT',
        url: (roomId: string, id: string) =>
          `/chat-rooms/${roomId}/chats/${id}`,
        comment: 'Update chat information',
        defaultBody: {
          content: 'world',
        },
      },
      delete: {
        urlKey: '/chat-rooms/*/chats/*',
        method: 'DELETE',
        url: (roomId: string, id: string) =>
          `/chat-rooms/${roomId}/chats/${id}`,
        comment: 'Delete chat',
      },
    },
    in: {
      urlKey: '/chat-rooms/in/*',
      method: 'POST',
      url: (id: string) => `/chat-rooms/in/${id}`,
      comment: 'Entering a chat room',
      defaultBody: {
        keyword: 'key12345',
      },
    },
    out: {
      urlKey: '/chat-rooms/out',
      method: 'POST',
      url: '/chat-rooms/out',
      comment: 'Leaving the chat room',
    },
    roomVisits: {
      visitors: {
        urlKey: '/chat-rooms/*/visitors',
        method: 'GET',
        url: (id: string) => `/chat-rooms/${id}/visitors`,
        comment: 'Retrieve visitor history',
        defaultParam: {
          ...GET_COMMON_PARAMS,
          ...GET_OPT_PARAMS,
          order: 'visited'
        },
      },
      inUsers: {
        urlKey: '/chat-rooms/*/users',
        method: 'GET',
        url: (id: string) => `/chat-rooms/${id}/users`,
        comment: 'Retrieving the current user in the room',
        defaultParam: {
          ...GET_COMMON_PARAMS,
          ...GET_OPT_PARAMS,
          order: 'visited'
        },
      },
    },
    favorites: {
      favors: {
        urlKey: '/chat-rooms/*/favors',
        method: 'GET',
        url: (id: string) => `/chat-rooms/${id}/favors`,
        comment: 'Retrieve favors',
        defaultParam: {
          ...GET_COMMON_PARAMS,
          ...GET_OPT_PARAMS,
          order: 'name'
        },
      },
      add: {
        urlKey: '/chat-rooms/*/favorites',
        method: 'POST',
        url: (id: string) => `/chat-rooms/${id}/favorites`,
        comment: 'Bookmark a chat room to your favorites',
      },
      cancel: {
        urlKey: '/chat-rooms/*/favorites',
        method: 'DELETE',
        url: (id: string) => `/chat-rooms/${id}/favorites`,
        comment: 'Remove a chat room from your favorites',
      },
    },
  },
};
