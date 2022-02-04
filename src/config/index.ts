const Config = {
  ENVIRONMENT: 'DEV',
  REALM_ID: 'reactnativestarter-dev-rslwg',
  REALM_BASE_URL: 'https://realm.mongodb.com',
};

export const config = {
  ENVIRONMENT: Config.ENVIRONMENT as 'DEV' | 'BETA' | 'PROD',

  REALM_ID: Config.REALM_ID,
  REALM_BASE_URL: Config.REALM_BASE_URL,
};
