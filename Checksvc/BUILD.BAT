@echo off
REM -------------------------------------------------------------------
REM BUILD.BAT - checksvc.exe
REM
REM   $Header:
REM   $Log:
REM
REM -------------------------------------------------------------------
REM
REM This batchfile takes one optional cmdline arg.
REM
REM arg1 - specifies directory location of WinTools
REM
REM If arg1 is not given, check for WINTOOLSDIR environment variable
REM default value for drive letter is Q:\MapleTools
REM
if %1NoArg == NoArg goto ChkEnv
set WINTOOLSDIR=%1
goto Start
:ChkEnv
if NOT DEFINED NIMBUS_WIN_TOOLS_DIR goto DfltDrv
set WINTOOLSDIR=%NIMBUS_WIN_TOOLS_DIR%
goto Start
:DfltDrv
set WINTOOLSDIR=Q:\MapleTools
:Start
echo ***********************************************************
echo  Building checksvc.exe
echo ***********************************************************

REM
REM This DOS batchfile will build checksvc.exe
REM

REM
REM Because of embedded DELETE commands, we'll make sure
REM we're in the right directory before continuing.
REM

IF EXIST checksvc.xml goto start
echo ********************************************
echo  ERROR - BATCHFILE TERMINATED
echo  IN WRONG LOCAL DIRECTORY!
echo ********************************************
pause
goto abort

:start
REM
REM Make sure we have access to the specified htmlmake directory
REM
IF EXIST ..\htmlframesdk\htmlframemake\ReleaseMinDependency\htmlframemake.dll GOTO ok2
echo **********************************************************
echo  ERROR - BATCHFILE TERMINATED
echo.
echo  CAN'T ACCESS ..\htmlframesdk\htmlframemake\releaseMinDependency\htmlframemake.dll
echo.
echo.
echo **********************************************************
pause
goto abort

:ok2
echo.
echo Deleting current files...
echo Y|del checksvc.exe      2>nul

echo.
echo Building checksvc.exe ...
echo -----------------------------------------
if exist C:\Windows\SysWOW64 (
echo 64 bit
C:\Windows\SysWOW64\cscript build.js //nologo
) else (
echo 32 bit
cscript build.js //nologo
)
IF ERRORLEVEL == 0 GOTO exit


:BldErr
echo ***************************************************
echo  ERROR - BATCHFILE TERMINATED
echo.
echo  ERROR REPORTED BY HTMLFRAMEMAKE - BUILD UNSUCCESSFUL!
echo ***************************************************
pause

:exit
REM
REM restore users dos env vars
REM

:abort
echo Done!

