export type Payload<T extends Promise<any>> = T extends Promise<infer Payload> ? Payload : never;
