// VIRTUAL TRUCKER RICH PRESENCE LITE 1.0.0

const LogManager = require('./LogManager');
const logger = new LogManager(); 
const config = require('./config');
const packageInfo = require('./package.json');
const argv = require('yargs').argv

logger.info('VT-RPC Lite is starting...');
logger.info(`Version: ${packageInfo.version}`);

var RichPresenceManager = require('./RichPresenceManager');
var presenceManager = new RichPresenceManager();
presenceManager.init();

// maintain node process running
process.stdin.resume();