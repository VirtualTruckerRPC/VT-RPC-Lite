<div>
    <img src="https://i.imgur.com/0wSXSgW.png"/>
</div>

# Virtual Trucker Rich Presence Lite
## Version 1.0

The Lite Version of Virtual Trucker Rich Presence!  

Here's our Discord server for support: https://discord.gg/Zt49WDH  

ETCARS 0.15 is required for the RPC to work.  

**TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!**
**Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15 from our installer, uncheck it if you have problems during installation and download seperately!**

Supports **Euro Truck Simulator 2** & **American Truck Simulator**.

**Rich presence example**

![Rich presence example](https://i.imgur.com/jvVHdaf.png)


## Use in end user environment

* Install VT-RPC Lite using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/VT-RPC-Lite/releases) .

**IF YOU HAVE THE FULL VT-RPC, UNINSTALL IT BEFORE USING THIS!**
**IF YOU ARE UPGRADING FROM VT-RPC LITE TO THE FULL VT-RPC, UNINSTALL THIS FIRST!**

Take a look to [User Guide](UserGuide.md) for further details.

## Use in development environment

But here is the most important information:  

REQUIRED PROGRAMS:  

* ETCARS 0.15 - https://myalpha.menzelstudios.com/  
* Node.js Current - https://nodejs.org  
* Git - https://git-scm.com  

1. Install and download the required programs.   
3. Open cmd/powershell by holding shift while right clicking inside the VT-RPC directory.  
4. Install the required node modules by typing "npm i" in PS/CMD.  
5. Start the rich presence by typing "node index.js".  
6. Start ETS2 or ATS.  
7. Select that and start playing!  

## Prepare for distribution

* Run `npm run compile` .
* Bundled exe will be written in the `release` directory.


## Create installation package

* Install InnoSetup - http://www.jrsoftware.org/isdl.php
* Install Inno Download Plugin - https://bit.ly/2KnepSA
* Open `setup\InnoSetup.iss` with InnoSetup and compile it
* Run `iscc .\setup\InnoSetupScript.iss` (Add to PATH variable env `C:\Program Files (x86)\Inno Setup 5`)
* Installation package will be written in `setup\Output\VTRPC-Lite-Setup.exe`

### Why there is a VBScript in this project?

We need `RunHidden.vbs` to run a packaged node.js app windowless in windows. So, the application is launched from that vbscript.

## Logging

Log file `vtrpc.log` is written in:

* Windows: `%appdata%\VT-RPC Lite\`
* Linux: `/var/local/VT-RPC Lite/`
* MacOS: `/home/Library/Preferences/VT-RPC Lite/`

## Startup parameters

* --dev : enable verbose development logging and dev environment behaviour
* --logetcarsdata : prints in console every ETCARS data received
* --logallactivity : prints in console every activity sent to Discord

# Credits To Staff
### Current Staff
SgtBreadStick: Coding, Images, Website Developer.  
dowmeister: ETCARS plugin, coding.  
Josh Menzel: ETCARS plugin, compatibility with ETCARS.  
Rein: Images.  
Heyhococo: Testing, Mac Testing.