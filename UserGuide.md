# User guide

## Download

Download latest installer from [Releases Page](https://github.com/VirtualTruckerRPC/VT-RPC-Lite/releases) .

## Installation on Windows

Run VTRPC-Lite-Setup.exe

### Select components

Select components to be installed, Virtual Trucker Rich Presence is mandatory, you can choose if download ETCARS or not. 
ETCARS is mandatory for the operation of Virtual Trucker Rich Presence. If it is already installed on your computer, you can also avoid downloading it.
If you choose to install ETCARS, ETCARS latest version installer will be downloaded automatically and installed at the end of this installation.


## Additional tasks and configuration

You can choose if you want to start Virtual Trucker Rich Presence at windows startup, is highly recommended.

## Confirm tasks and configuration

Confirm your choices.


## Downloading ETCARS

Wait for ETCARS download, if you selected it.


## Close running VT-RPC Lite

If you are updating to a newer version of Virtual Trucker Rich Presence, installer will ask if can kill running version to update it.


## Installation completed

Installation is completed. If you selected to install ETCARS leaving the check on, ETCARS installation will start automatically. 
You can choose if start Virtual Trucker Rich Presence immediately, installer will do it for you.


VT-RPC Lite will be installed in `C:\Program Files (x86)\VT-RPC Lite\` .
Log file can be found in:

* Windows: `%appdata%\VT-RPC Lite\`
* Linux: `/var/local/VT-RPC Lite/`
* MacOS: `/home/Library/Preferences/VT-RPC Lite/`

## Check if VT-RPC Lite works

If the installation was successful, ETCARS has been installed correctly, with Discord open, launches ETS2 or ATS, upload your profile and start driving.
In discord your profile should look like this:

![Rich presence](https://i.imgur.com/jvVHdaf.png)


# Run VT-RPC Lite manually

Run `RunHidden.vbs` from installation directory or start menu/screen. Avoid to run directly the exe.

# Reboot VT-RPC Lite

Run `RebootVTRPC.bat` from installation directory or start menu/screen.

# Troubleshooting

## Can't download ETCARS from installer

On Windows 7 you could encounter an error during ETCARS download from VTRPC installer. If this happens, download and install ETCARS separately from [ETCARS official site](https://etcars.menzelstudios.com/) . Then restart VTRPC installer without download and install ETCARS.

## My Rich Presence isn't updating

1) Check if VT-RPC-Lite.exe is running.

Open Task Manager > Tab "Details" > Search for "VT-RPC-Lite.exe"

![Task manager](https://imgur.com/F34Mt1f.png)

2) Check if ETCARS is installed correctly

When you open ETS2 or ATS, you will be prompt for accepting SDK modifications
You can also check the console in ETS2 or ATS for ETCARS messages

![](https://imgur.com/eMvJM1x.png)

`Connected to ETCARS`, `Game detected: ETS2` and `Discord RPC ready` are the most important lines. If you see these lines, VTRPC is running fine and it's working. 
If you don't see these log lines, something is not working with ETCARS.

3) Check if Rich presence is enabled in your Discord client. Go to Discord client options > Games and check if it's like this below

![](https://imgur.com/LeTig3K.png)

Your game activity settings should seems like this:

![](https://imgur.com/PGRbpgV.png)