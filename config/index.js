// config files:
const path = require('path');
const defaultConfig = './config-default.js';
const overrideConfig = '../bedrock/console.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

const fsExistsSync = function(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}


if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);

    if(fsExistsSync(path.join(__dirname, overrideConfig))) {
        console.log(`Load ${overrideConfig}...`);
        config = Object.assign(config, require(overrideConfig));
    }
    else {
        console.log(`Cannot load ${overrideConfig}.`);
    }

}

module.exports = config;
