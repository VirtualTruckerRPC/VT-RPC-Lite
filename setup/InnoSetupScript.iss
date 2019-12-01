#include <idp.iss>

#define MyAppName "VT-RPC Lite"
#define MyAppVersion "1.1.0"
#define MyAppPublisher "VirtualTruckerRPC"
#define MyAppURL "https://vtrpc.live"
#define MyAppExeName "VTRPC-Lite.exe"
#define MyServiceName "VTRPC-Lite"
#define RunHiddenVbs "RunHidden.vbs"
#define RebootVTRPC "RebootVTRPC.bat"

[Setup]
AppId={{07BC38A2-5FE0-4527-9B99-C2BD5E5A4919}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
AppMutex={#MyAppExeName}
DefaultDirName={pf64}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=no                                                                                                           
OutputBaseFilename=VTRPC-Lite Setup
SetupIconFile=..\assets\vtrpc.ico
Compression=lzma2/ultra64
SolidCompression=yes
PrivilegesRequired=admin
DirExistsWarning=no
Uninstallable=yes
InfoBeforeFile=Readme.txt
AllowCancelDuringInstall=no
ShowLanguageDialog=no
UsePreviousGroup=False
ArchitecturesInstallIn64BitMode=x64 ia64
ArchitecturesAllowed=x64 ia64
InternalCompressLevel=ultra64
CompressionThreads=4
WizardImageStretch=False
WizardImageFile=..\assets\vtrpc-banner.bmp
WizardSmallImageFile=..\assets\vtrpc.bmp
DisableWelcomePage=False

[Types]
Name: full; Description: "Full installation";
Name: update; Description: "Update installation"; Flags: iscustom

[Components]
Name: app; Description: "VT-RPC Lite v{#MyAppVersion}"; Types: full update; Flags: disablenouninstallwarning
Name: etcars; Description: "ETCARS 0.15.386 (Required)"; Types: full; Flags: disablenouninstallwarning

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[InstallDelete]
Type: filesandordirs; Name: "{pf64}\{#MyAppName}"
Type: filesandordirs; Name: "{pf}\{#MyAppName}"

[Files]
Source: "..\release\VTRPC-Lite.exe"; DestDir: "{app}"; Flags: ignoreversion;
Source: "..\vbs\RunHidden.vbs"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\bat\RebootVTRPC.bat"; DestDir: "{app}"; Flags: ignoreversion; 
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{commonstartup}\{#MyAppName}"; Filename: "{sys}\cscript.exe"; Parameters: """{app}\{#RunHiddenVbs}"""; Tasks:StartMenuEntry;
Name: "{group}\Restart VT-RPC Lite"; Filename: "{app}\{#RebootVTRPC}";
Name: "{group}\Uninstall VT-RPC Lite"; Filename: "{uninstallexe}";

[Tasks]
Name: "StartMenuEntry" ; Description: "Start {#MyAppName} when Windows starts (Recommended)" ; GroupDescription: "Windows Startup"; MinVersion: 4,4;
Name: "InstallETCARS"; Description: "Install ETCARS after installation"; GroupDescription: "Other Tasks"; Components: etcars;

[Run]
Filename: "{sys}\cscript.exe"; Parameters: """{app}\{#RunHiddenVbs}"""; Description: "Run {#MyAppName} immediately"; Flags: postinstall runhidden;
Filename: "{localappdata}\Temp\ETCARSx64.exe"; Description: "Install ETCARS"; Components: etcars; Tasks: InstallETCARS; Flags: hidewizard

[UninstallRun]
Filename: "{cmd}"; Parameters: "/C ""taskkill /im {#MyAppExeName} /f /t";

[Code]
procedure InitializeWizard;
begin
    idpDownloadAfter(wpReady);
end;

procedure CurPageChanged(CurPageID: Integer);
begin
    if CurPageID = wpReady then
    begin
        // User can navigate to 'Ready to install' page several times, so we 
        // need to clear file list to ensure that only needed files are added.
        idpClearFiles;

        if IsComponentSelected('etcars') then
            idpAddFile('https://etcars.menzelstudios.com/downloads/ETCARSx64.exe', ExpandConstant('{localappdata}\Temp\ETCARSx64.exe'));

        idpDownloadAfter(wpReady);
  end;
end;
