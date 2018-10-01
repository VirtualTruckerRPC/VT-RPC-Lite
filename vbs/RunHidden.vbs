' VIRTUAL TRUCKER RICH PRESENCE LITE 1.0.0
scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
Set shell = CreateObject("Wscript.Shell")
shell.CurrentDirectory = scriptdir
shell.Run """" & scriptdir & "\VT-RPC-Lite.exe", 0, False