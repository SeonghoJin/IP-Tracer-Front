import { config } from "../config";

const handlerFactory = <T extends object>(prefix: string) => {
  return {
    get: function (target, name) {
      return name in target
        ? prefix + target[name as keyof typeof target]
        : undefined;
    },
  } as ProxyHandler<T>;
};

const apiFactory =
  <T extends object>(prefix: string) =>
  (apis: T) => {
    return new Proxy(apis, handlerFactory<typeof apis>(prefix));
  };

export const api = {
  ...apiFactory<{
    postFeedback: string;
  }>(config.API_PREFIX)({
    postFeedback: "/user-feedback",
  }),
};
