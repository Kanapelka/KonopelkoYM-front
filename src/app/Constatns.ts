const Constants = {
  // API_PROTOCOL: 'https',
  API_PROTOCOL: 'http',
  // DOMAIN: 'vh167.by1910.hb.by',
  DOMAIN: 'localhost:5000',
  API_PATH: 'api',
  GOOGLE_CLIENT_ID: '1064924179379-sjb8bar058mgnhvh2tj8967f9m6afivc.apps.googleusercontent.com',

  LocalStorage: {
    DASHBOARD_LAYOUT: 'dashboard layout',
    TOKEN: 'authorization token',
    USER_ID: 'user id',
    USER: 'user',
  },

  Urls: {
    Pages: {
      SIGN_IN: '/sign-in',
      SIGN_UP: '/sign-up',
      DASHBOARDS: '/dashboards',
      USERS: '/users',
      PROJECTS: '/projects',
      TEAMMATES: '/teammates',
      TICKETS: '/tickets',
      ERROR_500: '/error',
      ERROR_404: '/not-found',
      ERROR_403: '/forbidden',
      NOTIFICATIONS: '/notifications',
    },
    Api: {
      SIGN_IN: 'authorization/sign-in',
      SIGN_UP: 'authorization/sign-up',
      SIGN_IN_WITH_GOOGLE: 'authorization/sign-in/google',
      PROJECTS: 'projects',
      USERS: 'users',
      MEMBERS: 'members',
    },
  },
};

export default Constants;
