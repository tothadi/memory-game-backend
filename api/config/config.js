// check env.
var env = process.env.NODE_ENV || 'production';
// fetch env.config
var config = require('./environments/config.json');  //For security reasons I placed a dummy data in './config.json' for public git
var envConfig = config[env];
// add env.config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);