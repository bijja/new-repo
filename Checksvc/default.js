var APP_WIDTH = 350;
var APP_HEIGHT = 150;

var sServiceName = "HP Systems Insight Manager";

var oFSO = window.external.CreateObject("Scripting.FileSystemObject");
var flag = true;

function CheckConnect()
{
    fncTrace(arguments);

    try
    {
        var oXML = window.external.createobject("Microsoft.XMLHTTP");
        oXML.onreadystatechange = function() {
            if (oXML.readyState == 4)
            {
                if (oXML.status == 200)
                {
                    var oIE = window.external.CreateObject("InternetExplorer.Application");
                    oIE.Navigate(getMainUrl());
                    oIE.Visible = true;
                    exit();
                    return;
                }
                else
                {
                    divStatus.innerHTML = LoadString(TXT_WAIT_STATUS);
                    imgProgress.style.display = "block";

                    setTimeout(CheckConnect, 500);
                }

                oXML = null;
            }
        }

        oXML.Open("GET", getTestUrl());
        oXML.Send("");

    }
    catch (err)
    {
        sysErr(err);
    }
}

function getHostName()
{
    var hostName = "localhost";
	// WMI Error -- Use the registry to get the Host Name
    var REG = "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\";
    var host = window.external.system.ReadRegistryKey(REG + "Hostname");
    if ((host != null) && (host.length != 0))
    {
    	hostName = host;
    }
    return hostName;
}


// Alternative method for getting host name.  Not currently used
function getHostNameFromWmi()
{
    var hostName = "localhost";
    try
    {
    	// Use WMI to get the Host Name
        var oLoc = window.external.createobject("WbemScripting.SWbemLocator");
        var oSvc = oLoc.ConnectServer(null, "root/cimv2");
        var computerSystems = oSvc.ExecQuery ("select * from Win32_ComputerSystem");
        for (var e = new Enumerator(computerSystems); !e.atEnd(); e.moveNext())
        {
            if ((e.item() != null) && (e.item().Name != null) && (e.item().Name.length != 0)) 
            {
            	hostName = e.item().Name
            }
        }
    }
    catch (err)
    {
    	sysErr(err);
    }

    return hostName;
}

function getTestUrl()
{
    return "http://" + getHostName() + ":280/GetCertificate";
}

function getMainUrl()
{
    return "http://" + getHostName() + ":280/";
}

//
//  ServiceStatus
//  0 - Database is not connecting.
//  1 - installed and running
// -1 - no such service
// -2 - service not running
// -3 - unknown error
//
function ServiceStatus(sServiceName)
{
    fncTrace(arguments);

    var dwRet = -1;
    try
    {	
		//Before Checking SIM service check if DB is running.
		var DBCheckFile = window.external.system.readRegKey6432("HKLM\\SOFTWARE\\Hewlett-Packard\\Systems Insight Manager\\Settings\\InstallPath") + "\\DBCheck";		
		if (oFSO.FileExists(DBCheckFile) == true){
		    return 0;    
		}
		
        var oLoc = window.external.createobject("WbemScripting.SWbemLocator");
        var oSvc = oLoc.ConnectServer(null, "root/cimv2");
        var colServices = oSvc.ExecQuery ("SELECT * FROM Win32_Service where DisplayName = '" + sServiceName + "'");
        for (var e = new Enumerator(colServices); !e.atEnd(); e.moveNext())
        {
            if ("Running" == e.item().State)
            {
                dwRet = 1;
            }
            else
            {
                dwRet = -2;
            }
        }
    }
    catch (err)
    {
        sysErr(err);
        dwRet = -3;
    }

    return dwRet;
}

function window_onload()
{
    fncTrace(arguments);

    InitStrings();
    document.title = LoadString(TXT_APP_NAME);
    divStatus.innerHTML = LoadString(TXT_CHECK_STATUS);

    try
    {
        window.external.application.width = APP_WIDTH;
        window.external.application.maxwidth = APP_WIDTH;
        window.external.application.minwidth = APP_WIDTH;
        window.external.application.height = APP_HEIGHT;
        window.external.application.maxheight = APP_HEIGHT;
        window.external.application.minheight = APP_HEIGHT;
        window.external.application.visible = true;

		// check for valid service
        nRetVal = ServiceStatus(sServiceName);
        switch (nRetVal)
        {
			// 0 if for database service/database error.
			case 0:				                
				divStatus.innerHTML = LoadString(ERR_DB_NOT_RUNNING);
                break;
            case 1:
                setTimeout(CheckConnect, 500);
                break;
            case -1:
                divStatus.innerHTML = LoadString(ERR_NOT_INSTALLED);
                break;
            case -2:
                divStatus.innerHTML = LoadString(ERR_NOT_RUNNING);
                break;
            default:
                divStatus.innerHTML = LoadString(ERR_UNKNOWN);
                break;
        }
    }
    catch (err)
    {
        window.external.application.visible = true;
        divStatus.innerHTML= LoadString(ERR_UNKNOWN);
        sysErr(err);
    }
}

window.onload = window_onload;
