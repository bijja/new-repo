var sAppName = "Check Service";
var bDebug = false;
if (1 == window.external.system.ReadRegistryKey("HKLM\\SOFTWARE\\Hewlett-Packard\\Systems Insight Manager\\CheckService"))
{
    bDebug = true;
}

function pad(nVal)
{
    if (nVal < 10)
        return "0" + nVal;
    return nVal;
}

function dbg(sText)
{
    try
    {
        if (bDebug)
        {
            window.external.system.dbg(sAppName + ":<DEBUG>" + sText);
        }
    }
    catch(err)
    {
    }
}

function ignore()
{
    return false;
}

function fncTrace(xArgs)
{
    if (bDebug)
    {
        var sFnc = (/^function\s+([\w$]+)/.test(xArgs.callee)?RegExp.$1:'anonymous') + "(";
        var args = new String(xArgs.callee.toString().match(/\(.*\)/));
        args = args.substring(1,args.length-1);
        var arg2 = args.split(",");
        for (var i = 0; i < xArgs.length; i++)
        {
            sFnc += arg2[i];
            if ("function" == typeof(xArgs[i]) || "object" == typeof(xArgs[i]) || "undefined" == typeof(xArgs[i]))
            {
                sFnc += "[" + typeof(xArgs[i]) + "]";
            }
            else if (-1 != arg2[i].toLowerCase().indexOf("password"))
            {
                sFnc += "[**********]";
            }
            else
            {
                sFnc += "[" + xArgs[i] + "]";
            }
        }
        sFnc += ")";
        dbg(sFnc);
    }
}


function onError(msg, url, linenumber)
{
    dbg((/^function\s+([\w$]+)/.test(arguments.callee)?RegExp.$1:'anonymous') + " " + msg + " " + url + ":" + linenumber);
    return true;
}


function sysErr(oErr)
{
    dbg((/^function\s+([\w$]+)/.test(arguments.callee)?RegExp.$1:'anonymous') + ":Exception:" + oErr.number + " " + oErr.description);
}


function exit()
{
    try
    {
        window.external.application.exit();
    }
    catch (err)
    {
    }
}

function AskCancel()
{
    exit();
}

//
// InitStrings
//
function InitStrings()
{
    var MsgArray = new Array(MAX_STRING_INDEX + 1);
    window.external.dictionary.add("STRINGS",MsgArray);
    
    switch (window.navigator.userLanguage.substr(0,2))
    {
        case 'ja': ja_InitStrings(MsgArray);break;
        case 'fr': fr_InitStrings(MsgArray); break;
        case 'it': it_InitStrings(MsgArray);break;
        case 'es': es_InitStrings(MsgArray);break;
        case 'de': de_InitStrings(MsgArray);break;
        default: en_InitStrings(MsgArray);break;
    }
}


//
// LoadString
//
function LoadString(nIndex)
{
    if ((nIndex < ERR_UNKNOWN_STRING) || (nIndex > MAX_STRING_INDEX))
    {
        return window.external.dictionary.item("STRINGS")[ERR_UNKNOWN_STRING] + nIndex;
    }
    else
    {
        return window.external.dictionary.item("STRINGS")[nIndex];
    }
}

try
{
    window.onerror=onError
}
catch(err)
{
}

document.onmousedown=ignore;
document.oncontextmenu=ignore;
