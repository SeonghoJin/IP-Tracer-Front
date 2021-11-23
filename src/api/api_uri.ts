import {config} from "../config";

const handlerFactory = <T extends object>(prefix : string) => {
    return {
        get: function (target, name){
            return name in target ? prefix + target[name as keyof typeof target] : undefined
        }
    } as ProxyHandler<T>
}


const API_URI_1 = (APP_SERVER_PREFIX: string) => {
    const apis = {
        postFeedback: '/user-feedback',
    }
    return new Proxy(apis, handlerFactory<typeof apis>(APP_SERVER_PREFIX));
}

const API_URI_2 = (APP_SERVER_PREFIX: string) => {
    return {
        temp: (str: string) => str
    }
}

export const api = {
    ...API_URI_1(config.API_PREFIX),
    ...API_URI_2(config.API_PREFIX),
}
