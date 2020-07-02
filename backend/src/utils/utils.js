export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const NODE_ENVIRONMENT = {
  PROD: 'production',
  DEV: 'development',
};

export function getNodeEnv() {
  return process.env.NODE_ENV || NODE_ENVIRONMENT.DEV;
}
