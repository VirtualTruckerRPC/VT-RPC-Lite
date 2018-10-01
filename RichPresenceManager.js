// VIRTUAL TRUCKER RICH PRESENCE LITE 1.0.0

const DiscordRPC = require('discord-rpc');
var ip = require("ip");
var ETCarsClient = require('etcars-node-client');
var fetch = require('node-fetch');
var util = require('util');
var config = require('./config');
const LogManager = require('./LogManager');
const path = require('path');
const argv = require('yargs').argv
var child_process = require('child_process');

class RichPresenceManager {
    constructor() {
        this.logger = new LogManager();
        this.etcars = new ETCarsClient();

        // configure logging for ETCars client
        if (argv.dev)
            this.etcars.enableDebug = false;

        // setting initial variables state
        this.rpc = null;

        this.lastData = null;
        this.rpcReady = false;
        this.rpcOnChangingState = false;
    }

    init() {
        this.bindETCarsEvents();

        this.etcars.connect();
    }

    bindETCarsEvents() {
        var instance = this;

        this.etcars.on('data', function (data) {
            //use a try / catch as sometimes the data isn't there when first connecting...plus it's json parsing...
            try {

                // putting apart last data received
                instance.lastData = data;
                if (typeof (data.telemetry) != 'undefined' && data.telemetry) {

                    if (argv.logetcarsdata) {
                        instance.logger.debug(data);
                    }

                    // telemetry exists

                    // begin to initialize Discord RPC
                    // checking if is in valid state
                    if (!instance.rpcOnChangingState) {

                        // checking if is not ready
                        if (!instance.rpcReady) {

                            instance.rpcOnChangingState = true;

                            // getting application id (default ETS2)
                            var applicationID = config.applications.ets2;

                            // checking if playing ATS
                            if (instance.isAts(data)) {
                                applicationID = config.applications.ats;
                                instance.logger.info('Game detected: ATS');
                            } else {
                                instance.logger.info('Game detected: ETS2');
                            }
                            instance.logger.info(`Using Discord Application ID ${applicationID}`);

                            // creating a new Discord RPC Client instance
                            instance.rpc = new DiscordRPC.Client({
                                transport: 'ipc'
                            });

                            // login to RPC
                            instance.rpc.login({clientId: applicationID }).then(() => {
                                instance.logger.info('Discord RPC ready');
                                // cleaning up variables to save RPC Client state
                                instance.rpcReady = true;
                                instance.rpcOnChangingState = false;
                            }).catch(console.error);
                        }
                    }

                    if (instance.rpcReady) {
                        var activity = instance.buildActivity(data);

                        if (activity != null) {
                            instance.rpc.setActivity(activity);
                        }
                    }
                }
            } catch (error) {
                instance.logger.error(error);
            }
        });

        this.etcars.on('connect', function (data) {
            instance.logger.info('Connected to ETCARS');
        });

        this.etcars.on('error', function (data) {
            instance.resetETCarsData();

            instance.destroyRPCClient();
        });
    }
    
    buildActivity(data) {
        var activity = null;

        if (typeof data.telemetry != 'undefined' && data.telemetry) {
            activity = {};
                
            activity.details = '';
            activity.state = '';
            
            if (data.telemetry.game.isMultiplayer == true) {
                if (typeof data.telemetry.job != 'undefined' && data.telemetry.job && data.telemetry.job.onJob === true) {
                    if (data.telemetry.truck.make == false) {
                        activity.details = `Game Loading...`
                        activity.state = `Offline`
                        activity.smallImageKey = `rpc_offline`;
                        activity.smallImageText = `Offline`
                    } else {
                        activity.details += `Driving a ${data.telemetry.truck.make} ${data.telemetry.truck.model}`
                        activity.state += `${data.telemetry.job.sourceCity} > ${data.telemetry.job.destinationCity}`
                        activity.largeImageText = `Cargo: ${data.telemetry.job.cargo}`
                        activity.smallImageKey = `rpc_online`;
                        activity.smallImageText = `Online`
                    }
                } else {
                    activity.largeImageText = `VT-RPC Lite 1.0`

                    if (data.telemetry.truck.make == false) {
                        activity.details = `Game Loading...`
                        activity.state = `Offline`
                        activity.smallImageKey = `rpc_offline`
                        activity.smallImageText = `Offline`
                    } else {
                        activity.details += `Driving a ${data.telemetry.truck.make} ${data.telemetry.truck.model}`;
                        activity.state = `Freeroaming`
                        activity.smallImageKey = `rpc_online`;
                        activity.smallImageText = `Online`
                    }
                }

            } else {
                if (typeof data.telemetry.job != 'undefined' && data.telemetry.job && data.telemetry.job.onJob === true) {
                    if (data.telemetry.truck.make == false) {
                        activity.details = `Game Loading...`
                        activity.state = `Offline`
                        activity.smallImageKey = `rpc_offline`;
                        activity.smallImageText = `Offline`
                    } else {
                        activity.details += `Driving a ${data.telemetry.truck.make} ${data.telemetry.truck.model}`
                        activity.state += `${data.telemetry.job.sourceCity} > ${data.telemetry.job.destinationCity}`
                        activity.largeImageText = `Cargo: ${data.telemetry.job.cargo}`
                        activity.smallImageKey = `rpc_offline`;
                        activity.smallImageText = `Offline`
                    }
                } else {
                    activity.largeImageText = `VT-RPC Lite 1.0`

                    if (data.telemetry.truck.make == false) {
                        activity.details = `Game Loading...`
                        activity.state = `Offline`
                        activity.smallImageKey = `rpc_offline`
                        activity.smallImageText = `Offline`
                        activity.details = `Offline`
                    } else {
                        activity.details += `Driving a ${data.telemetry.truck.make} ${data.telemetry.truck.model}`;
                        activity.state = `Freeroaming`
                        activity.smallImageKey = `rpc_offline`;
                        activity.smallImageText = `Offline`
                    }
                }
            }
            
            activity.largeImageKey = this.getLargeImageKey(data);

                if (argv.logallactivity) {
                    console.log(activity);
                }
        }

        return activity;
    }

    isAts(data) {
        return data.telemetry.game.gameID == config.constants.ats;
    }

    getLargeImageKey(data) {
        var prefix = config.constants.ets2LargeImagePrefix;
        var key = '';

        if (this.isAts(data)){
            prefix = config.constants.atsLargeImagePrefix;
		}
			
        if (key == '') {
            key = config.constants.largeImageKeys.driving;
        }

        //console.log(key);
        return prefix + key;
    }

    resetETCarsData() {
        this.lastData = null;
    }

    destroyRPCClient() {
        if (this.rpc != null) {
            var instance = this;
            this.rpc.setActivity({});
            this.rpc.destroy().then(() => {
                instance.rpc = null;
            });
            this.rpcReady = false;
            this.rpcOnChangingState = false;
            this.logger.info('Discord RPC Client destroyed');
        }
    }

}

module.exports = RichPresenceManager;