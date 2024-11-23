declare module '*.jpg';
declare module '*.png';

declare module '@env' {
  export const AWS_ACCESS_KEY_ID: string;
  export const AWS_SECRET_ACCESS_KEY: string;
  export const GOOGLE_PLACE_API_KEY: string;
  // Declare outras variáveis de ambiente que você está usando
}
