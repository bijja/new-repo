function en_InitStrings(MsgArray)
{
    PROD_NAME = "HPE Systems Insight Manager Check Service";
    MsgArray[ERR_UNKNOWN_STRING] = "Unknown string";
    MsgArray[ERR_UNKNOWN] = "Encountered an unknown error.";
    MsgArray[TXT_APP_NAME] = PROD_NAME;
    MsgArray[TXT_CHECK_STATUS] = "Checking the HPE Systems Insight Manager web server.";
    MsgArray[TXT_WAIT_STATUS] = "Waiting for the HPE Systems Insight Manager web server.";
    MsgArray[ERR_NOT_INSTALLED] = "The HPE Systems Insight Manager Service is not installed.";
    MsgArray[ERR_NOT_RUNNING] = "The HPE Systems Insight Manager Service is not running.";
    MsgArray[ERR_DB_NOT_RUNNING] = "Unable to connect to database. Check if database service is running.";
};
