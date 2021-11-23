export type EmailOptions = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  service: string;
};

export interface EmailAsyncOptions {
  useFactory: (...args: any[]) => EmailOptions;
  inject: any[];
}
