export type Message<T> = {
  event: any;
  data: T;
};

export const isMessage = (msg: any): msg is Message<any> => {
  if (!("event" in msg)) return false;
  if (!("data" in msg)) return false;
  return true;
};
