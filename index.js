// VIRTUAL TRUCKER RICH PRESENCE LITE 1.1.0
const config = require('./config');
var now = require("date-now")
const packageInfo = require('./package.json');
const argv = require('yargs').argv

logger.info('VT-RPC Lite is starting...');
logger.info(`Version: ${packageInfo.version}`);

var RPCManager = require('./RPCManager');
var presenceManager = new RPCManager();
presenceManager.init();

// maintain node process running
process.stdin.resume();