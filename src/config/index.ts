export type Config = {
    API_URI : string;
    SOCKET_URI : string;
    NODE_ENV: string;
}

if (process.env.REACT_APP_API_URI === undefined || process.env.NODE_ENV === undefined || process.env.REACT_APP_SOCKET_URI === undefined) {
    throw new Error(
        "⚠️  Couldn't find .env.development.local or .env  ⚠️\n" +
        'If you run the npm run build script, you must write the .env file.\n' +
        'The form for this file exists in the envTemplate.'
    );
}


export const config : Config = {
    NODE_ENV: process.env.NODE_ENV,
    SOCKET_URI: process.env.REACT_APP_SOCKET_URI,
    API_URI: process.env.REACT_APP_API_URI
}
