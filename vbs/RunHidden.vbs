' VIRTUAL TRUCKER RICH PRESENCE LITE 1.1.0
scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
Set shell = CreateObject("Wscript.Shell")
shell.CurrentDirectory = scriptdir
shell.Run """" & scriptdir & "\VTRPC-Lite.exe", 0, False