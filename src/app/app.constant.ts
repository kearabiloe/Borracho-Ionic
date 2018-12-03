 export const ENV = {
    production: process.env.PARSE_PRODUCTION ? process.env.PARSE_PRODUCTION : true,
    parseAppId: 'Borracho',
    parseServerUrl: this.production? 'https://ac-parse-server.herokuapp.com/parse' :'http://192.168.43.128:1337/parse'
};

console.log("Parse Production:",ENV.production);
