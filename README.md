<div>
    <img src="https://i.sgtbrds.tk/js3fxk.png" width="100%" />
</div>

# Virtual Trucker Rich Presence Lite
## Version 1.1.0

A lighter version of the tool to let others see your current job, truck, etc. using Discord Rich Presence!  
Here's our Discord server for support: https://discord.gg/Zt49WDH  

ETCARS 0.15.386 is required for the RPC to work, older versions will not work.  

## Things to note!
* TruckersMP has their own Rich Presence which needs to be disabled in MP Settings!
* Due to a few problems with previous ETCARS, you will need to install ETCARS 0.15.386 from our installer.
* IF YOU HAVE ETCARS INSTALLED, PLEASE REINSTALL IT WITH ONE INCLUDED WITH VT-RPC!

**IF YOU HAVE THE FULL VT-RPC, UNINSTALL IT BEFORE USING THIS!**
**IF YOU ARE UPGRADING FROM VT-RPC LITE TO THE FULL VT-RPC, UNINSTALL THIS FIRST!**

Supports **Euro Truck Simulator 2**, **American Truck Simulator** and **TruckersMP**.  
**Rich presence example**
![Rich presence example](https://i.imgur.com/jvVHdaf.png) 

## Changelog
### Update 1.1.0
 - Completely Rewritten and lite-er than ever!
 - Added MP Information to the small image (hover)
 - Better display of information in Rich Presence

## Use in end user environment
* Install VT-RPC Lite using a release installation package from [Releases Page](https://github.com/VirtualTruckerRPC/VT-RPC-Lite/releases).

Take a look to [User Guide](UserGuide.md) for further details.

## Use in development environment
But here is the most important information:  

REQUIRED PROGRAMS:  
* ETCARS 0.15.386 - https://etcars.menzelstudios.com/
* NodeJS 12.13.1 - https://nodejs.org/download/release/v12.13.1/node-v12.13.1-x64.msi  
* Git - https://git-scm.com

1. Install and download the required programs.   
3. Open cmd/powershell by holding shift while right clicking inside the VT-RPC directory.  
4. Install the required node modules by typing "npm i" in PS/CMD.  
5. Start the rich presence by typing "node index.js --dev". (--dev not required but recommended)  
6. Start ETS2/ATS.  
7. Select that and start playing!  

## Prepare for distribution
* Run `npm run compile` .
* Bundled exe will be written in `release` directory.

## Create installation package
* Install InnoSetup 5.6.1 - http://files.jrsoftware.org/is/5/innosetup-5.6.1.exe (YOU WILL NEED INNOSETUP 5!)
* Install Inno Download Plugin - https://bit.ly/2KnepSA
* Open `setup\InnoSetup.iss` with InnoSetup and compile it
* Run `iscc .\setup\InnoSetupScript.iss` (Add to PATH variable env `C:\Program Files (x86)\Inno Setup 5`)
* Installation package will be written in `setup\Output\VTRPC-LiteSetup.exe`


### Why there is a VBScript in this project?
We need `RunHidden.vbs` to run a packaged node.js app windowless in windows. So, the application is launched from that vbscript.

## Startup parameters
* --dev : enable verbose development logging and dev environment behaviour
* --logetcarsdata : prints in console every ETCARS data received
* --logallactivity : prints in console every activity sent to Discord


# Credits To Staff
### Current Staff
SgtBreadStick: Coding, Images, Guides, Website Developer.  
jammerxd: ETCARS plugin, compatibility with ETCARS.  
Cody™: Bot Development.  

### Retired Staff
Lasse: Initial project, coding.  
dowmeister: ETCARS plugin, coding, Trucky & Trucky API.  
Rein: Previous Images.