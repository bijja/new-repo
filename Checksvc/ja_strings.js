function ja_InitStrings(MsgArray)
{
    PROD_NAME = "HPE Systems Insight Managerチェックサービス";
    MsgArray[ERR_UNKNOWN_STRING] = "不明な文字列";
    MsgArray[ERR_UNKNOWN] = "不明なエラーが発生しました。";
    MsgArray[TXT_APP_NAME] = PROD_NAME;
    MsgArray[TXT_CHECK_STATUS] = "HPE Systems Insight Manager Webサーバーを確認しています。";
    MsgArray[TXT_WAIT_STATUS] = "HPE Systems Insight Manager Webサーバーの起動を待っています。";
    MsgArray[ERR_NOT_INSTALLED] = "HPE Systems Insight Managerサービスはインストールされていません。";
    MsgArray[ERR_NOT_RUNNING] = "HPE Systems Insight Managerサービスは実行中ではありません。";
	MsgArray[ERR_DB_NOT_RUNNING] = "データベースに接続できません。データベースサービスが実行されていることを確認してください。";
};
