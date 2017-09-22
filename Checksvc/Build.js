var oWshShell = WScript.CreateObject("WScript.Shell");

var oCompiler;
var oDocument;
var bFrameMakeInstalled = false;
var bMSXMLInstalled = false;
var retVal = -1;
var FrameMakeDll = "..\\htmlframesdk\\htmlframemake\\releasemindependency\\htmlframemake.dll"
var RegsvrCmd = "%SystemRoot%\\system32\\regsvr32.exe "
var strOutputFile = ".\\checksvc.exe"
var strScriptFile = ".\\checksvc.xml"

var path = oWshShell.ExpandEnvironmentStrings("%WINTOOLSDIR%");
if ("%WINTOOLSDIR%" == path)
{
    path = oWshShell.ExpandEnvironmentStrings("%NIMBUS_WIN_TOOLS_DIR%");
    if ("%NIMBUS_WIN_TOOLS_DIR%" == path)
    {
        path = "q:\\mapletools";
    }
}

var MSXMLDll = path + "\\msxml4\\msxml4.dll"


function RegisterDLL(sDllName)
{
	oWshShell.Run(RegsvrCmd + " /s " + sDllName, 10, true);
}

function UnregisterDLL(sDllName)
{
	oWshShell.Run(RegsvrCmd + " /s /u " + sDllName, 10, true);
}


function main()
{
	var nRetVal = -1;
	//
	// instantiate the XML parser
	//
	try
	{
	   oDocument = new ActiveXObject("MSXML2.DOMDocument.4.0");
	}
	catch(e)
	{
		RegisterDLL(MSXMLDll);
		bMSXMLInstalled = true;
	}

	try
	{
	   oDocument = new ActiveXObject("MSXML2.DOMDocument.4.0");
	}
	catch(e)
	{
	   WScript.Echo("ERROR: " + MSXMLDll + " must be registered before running this script");
	   return nRetVal;
	}

	//
	// instantiate the compiler
	//
	
	try
	{
	   oCompiler = new ActiveXObject("HtmlFrameMake.Compiler");
	}
	catch(e)
	{
	   RegisterDLL(FrameMakeDll);
	   bFrameMakeInstalled = true;
	}

	try
	{
	   oCompiler = new ActiveXObject("HtmlFrameMake.Compiler");
	}
	catch(e)
	{
	   WScript.Echo("ERROR: " + MSXMLDll + " must be registered before running this script");
	   if (bMSXMLInstalled)
	   {
	   	UnregisterDLL(MSXMLDll);
	   }
	   return nRetVal;
	}


	try
	{
		if(oDocument.load(strScriptFile))
		{
			if("script" == oDocument.documentElement.nodeName)
			{
				oCompiler.OutputPath = strOutputFile;
				oCompiler.Project = oDocument.documentElement;
				if(oCompiler.Build())
				{
					nRetVal = 0;
				}
				else
				{
					nRetVal = 1;
				}
			}
			else
			{
				nRetVal = 2;
			}
		}
		else
		{
			nRetVal = 3;
		}

		if(bFrameMakeInstalled)
		{
			UnregisterDLL(FrameMakeDll);
		}
	
	   if(bMSXMLInstalled)
	   {
	   	UnregisterDLL(MSXMLDll);
	   }

		switch (nRetVal)
		{
			case 0:
				WScript.Echo("HTMLFrame Compiler Utility\n\n" + strOutputFile + "\" updated successfully\n\n");
				break;
			case 1:
				WScript.Echo("HTMLFrame Compiler Utility\n\n" + "Build Failed:\n" + oCompiler.LastError);
				break;
			case 2:
				WScript.Echo("HTMLFrame Compiler Utility\n\n" + "Error: Invalid project file\n");
				break;
			case 3:
				WScript.Echo("HTMLFrame Compiler Utility\n\n" + "Error: Unable to load the script file: " + strScriptFile + "\n" + "Details: " + oDocument.parseError.reason + "\n");
				break;
			default:
				WScript.Echo("HTMLFrame Compiler Utility\n\n" + "Unknown error " + retVal + "\n");
				break;
		}
	}
	catch (err)
	{
		nRetVal = err.number;
		WScript.Echo(err.description);	
	}
	return nRetVal;
}

WScript.Quit(main());


