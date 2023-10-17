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
        url: (roomId: string, id: string) => `/chat-rooms/${roomId}/chats/${id}`,
        comment: 'Obtaining chat information',
      },
      get: {
        urlKey: '/chat-rooms/*/chats',
        method: 'GET',
        url: '/chat-rooms/*/chats',
        comment: 'Retrieving the chat list',
      },
      create: {
        urlKey: '/chat-rooms/*/chats',
        method: 'POST',
        url: '/chat-rooms/*/chats',
        comment: 'Send Chat',
        defaultBody: {
          content: 'hello',
        },
      },
      update: {
        urlKey: '/chat-rooms/*/chats/*',
        method: 'PUT',
        url: (roomId: string, id: string) => `/chat-rooms/${roomId}/chats/${id}`,
        comment: 'Update chat information',
        defaultBody: {
          content: 'world',
        },
      },
      delete: {
        urlKey: '/chat-rooms/*/chats/*',
        method: 'DELETE',
        url: (roomId: string, id: string) => `/chat-rooms/${roomId}/chats/${id}`,
        comment: 'Delete chat',
      },
    },
    in: {
      urlKey: '/chat-rooms/in/*',
      method: 'POST',
      url: (id: string) => `/chat-rooms/in/${id}`,
      comment: 'Entering a chat room',
    },
    out: {
      urlKey: '/chat-rooms/out',
      method: 'POST',
      url: '/chat-rooms/out',
      comment: 'Leaving the chat room',
    },
    favorites: {
      favors: {
        urlKey: '/users/*/favors',
        method: 'GET',
        url: (id: string) => `/users/${id}/favors`,
        comment: 'Retrieving chat room favors',
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
    }
  },
};
