export type Config = {
    API_PREFIX : string;
    SOCKET_URL : string;
    NODE_ENV: string;
}

if (process.env.REACT_APP_API_PREFIX === undefined || process.env.NODE_ENV === undefined || process.env.REACT_APP_SOCKET_URL === undefined) {
    throw new Error(
        "⚠️  Couldn't find .env  ⚠️\n" +
        'If you run the npm run build script, you must write the .env file.\n' +
        'The form for this file exists in the envTemplate.'
    );
}


export const config : Config = {
    NODE_ENV: process.env.NODE_ENV,
    SOCKET_URL: process.env.REACT_APP_SOCKET_URL,
    API_PREFIX: process.env.REACT_APP_API_PREFIX
}
