export enum CarApiEnvironment {
  DEV = 'dev',
  TEST = 'test',
  PROD = 'production',
}

type Configuration = {
  NODE_ENV: string;
  PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number,
  POSTGRES_USER: string,
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string,
  DISCOUNT: number;
  START_MONTH: number;
  END_MONTH: number;
  ONE_MONTH: number,
};

export default (): Configuration => ({
  NODE_ENV: process.env.NODE_ENV || CarApiEnvironment.DEV,
  PORT: Number(process.env.PORT || 3000),

  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT || 5432),
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,

  DISCOUNT: Number(process.env.DISCOUNT || 10),
  START_MONTH: Number(process.env.START_MONTH || 12),
  END_MONTH: Number(process.env.END_MONTH || 18),
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
});
