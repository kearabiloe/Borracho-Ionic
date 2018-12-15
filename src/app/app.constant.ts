 export const ENV = {
    production: process.env.PARSE_PRODUCTION ? process.env.PARSE_PRODUCTION : false,
    parseAppId: 'Borracho',
    parseServerUrl: process.env.PARSE_SERVER_URL? process.env.PARSE_SERVER_URL: 'https://ac-parse-server.herokuapp.com/parse'
};
