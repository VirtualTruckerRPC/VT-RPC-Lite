// VIRTUAL TRUCKER RICH PRESENCE LITE 1.1.0
const config = require('./config');
var now = require("date-now")
const packageInfo = require('./package.json');
const argv = require('yargs').argv
var ETCarsClient = require('etcars-node-client');

class RPCManager {
    // IMPORTANT STUFF //
    constructor() {
        this.etcars = new ETCarsClient();

        // configure logging for ETCars client
        if(argv.dev) {
            this.etcars.enableDebug = false;
        }

        this.rpc = null;
        this.mpCheckerIntervalTime = config.mpCheckerIntervalMilliseconds;

        if(argv.dev) {
            this.mpCheckerIntervalTime = 0.5 * 60 * 1000; // 30 seconds
        }

        this.rpcReady = false;
        this.rpcOnChangingState = false;
        this.Multiplayer = false;
        this.mpCheckerInterval = null;
    }

    // INITIALIZATION OF VT-RPC //
    init() {
        this.bindETCarsEvents();
        this.etcars.connect();
    }

    // ETCARS AND DISCORD RPC CONFIGURATION //
    bindETCarsEvents() {
        var instance = this;
        this.etcars.on('data', function(data){
            try {
                instance.lastData = data;
                if (typeof (data.telemetry) != 'undefined' && data.telemetry) {
                    if (argv.logetcarsdata) {
                        instance.logger.debug(data);
                    }

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

                            instance.timestamp = Date.now()

                            // creating a new Discord RPC Client instance
                            instance.rpc = new DiscordRPC.Client({
                                transport: 'ipc'
                            })

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
                        // checking if playing in multiplayer and loading online state, server and position
                        if (instance.checkIfMultiplayer(data)) {
                            console.log('Multiplayer detected');
                            instance.Multiplayer == true;
                            instance.startMPChecker();
                            instance.checkMpInfo();
                        }
                        var activity = instance.buildActivity(data);
                        if (activity != null) {
                            instance.rpc.setActivity(activity);
                        }
                    }
                }
            } catch { 
                console.error(error);
            }
        });

        this.etcars.on('connect', function (data) {
            console.log("Connected to ETCARS")
        });

        this.etcars.on('error', function (data) {
            this.lastData = null;
            instance.destroyRPCClient();
        });
    }

    // EXTERNAL FUNCTIONS //
    startMPChecker() {
        if (this.mpCheckerInterval == null) {
            var instance = this;
            this.mpCheckerInterval = setInterval(() => {
                instance.checkMpInfo()
            }, this.mpCheckerIntervalTime);
            this.logger.info('Starting MP Checker interval');
        }
    }

    resetMPChecker() {
        if (this.mpCheckerInterval != null) {
            clearInterval(this.mpCheckerInterval);
            this.mpCheckerInterval = null;
            this.mpInfo = null;
            this.logger.info('MP Checker interval reset');
        }
    }

    checkMpInfo() {
        var instance = this;

            if (this.lastData != null && this.checkIfMultiplayer(this.lastData)) {

                this.logger.info('Checking online status');

                var url = util.format('https://api.truckyapp.com/v1/richpresence/playerInfo?query=%s', this.lastData.telemetry.user.steamID);

                //console.log(url);
                fetch(url).then((body) => {
                    return body.json()
                }).then((json) => {

                    if (!json.error) {
                        try {
                            var response = json.response;
                            if (response.onlineState.online) {
                                instance.mpInfo = {
                                    online: true,
                                    server: response.onlineState.serverDetails,
                                    playerid: response.onlineState.p_id,
                                };
                            } else {
                                instance.mpInfo = {
                                    online: false,
                                    server: false,
                                    playerid: false,
                                }
                            };
                        }
                        catch (error) {
                            instance.logger.error(error);
                        }
                    } else {
                        instance.mpInfo = null;
                    }
                });
            }
    }

    // DISCORD ACTIVITY //
    buildActivity(data) {
        var activity = null;

        if (typeof data.telemetry != 'undefined' && data.telemetry) {
            activity = {};

            if(data.telemetry.truck.make == false) {
                this.gameLoading = true;
            } else {
                this.gameLoading = false;
            }

            activity.details = '';
            activity.state = '';
            activity.startTimestamp = this.timestamp;

            if (typeof data.telemetry.job != 'undefined' && data.telemetry.job && data.telemetry.job.onJob === true) {
                if (data.telemetry.job.sourceCity != null){
                    activity.details = `${data.telemetry.job.sourceCity} >> ${data.telemetry.job.destinationCity}`;
                } else {
                    activity.details = `>> Special Transport <<`
                }
            } else {
                if (this.gameLoading) {
                    activity.details = `Loading game...`
                } else {
                    activity.details = `Freeroaming`;
                    activity.state = `${data.telemetry.truck.make} ${data.telemetry.truck.model}`

                }
            }

            activity.largeImageText = `VT-RPC Lite v1.1.0`;
            
            if(data.telemetry.game.gameID == ats) {
                activity.largeImageKey = atsrpc_active;
            } else {
                activity.largeImageKey = ets2rpc_active;
            }
            

            if (data.telemetry.game.isMultiplayer == true) {
                activity.smallImageKey = rpc_online
                activity.smallImageText = util.format('%s - ID %s', this.mpInfo.server.name, this.mpInfo.playerid)
            } else {
                activity.smallImageKey = rpc_offline
                activity.smallImageText = `Singleplayer`
            }
            if (argv.logallactivity) {
                console.log(activity);
            }
        }

        return activity;
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