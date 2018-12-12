 export const ENV = {
    production: process.env.PARSE_PRODUCTION ? process.env.PARSE_PRODUCTION : false,
    parseAppId: 'Borracho',
    parseServerUrl: ''
};
ENV.parseServerUrl=ENV.production? 'https://ac-parse-server.herokuapp.com/parse' :'http://localhost:1337/parse';
console.log("Parse Production:",ENV.production);
console.log(ENV.parseServerUrl)
