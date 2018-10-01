// VIRTUAL TRUCKER RICH PRESENCE LITE 1.0.0

const packageInfo = require('./package.json');

module.exports = {
    applications: {
        ets2: '432559364772200479',
        ats: '454028920107565107',
    },
    version: `VT-RPC Lite ${packageInfo.version}`,
    constants: {
        ets2: 'ets2',
        ats: 'ats',
        ets2LargeImagePrefix: 'ets2rpc_',
        atsLargeImagePrefix: 'atsrpc_',
        largeImageKeys: {
            driving: 'driving',
        },
    },
}