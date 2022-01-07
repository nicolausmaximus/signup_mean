// check env.
var env = 'development';
// fetch env. config
var config = require('./config.json');
var envConfig = config[env];
// add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);