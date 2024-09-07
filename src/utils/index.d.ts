declare module '*.jpg';
declare module '*.png';

declare module '@env' {
  export const AWS_ACCESS_KEY_ID: string;
  export const AWS_SECRET_ACCESS_KEY: string;
  export const url_key: string;
  // Declare outras variáveis de ambiente que você está usando
}
