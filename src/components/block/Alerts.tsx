import React from "react";
import { useRecoilState } from "recoil";
import {
  logoutAlertState,
  loginAlertState,
  defaultErrorAlertState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import BasicAlert from "../atoms/alerts/BasicAlert";
import MultipurposeAlert from "../atoms/alerts/MultipurposeAlert";

const Alerts = () => {
  const [logoutAlert, setLogoutAlert] = useRecoilState(logoutAlertState);
  const [loginAlert, setLoginAlert] = useRecoilState(loginAlertState);
  const [defaultErrorAlert, setDefaultErrorAlert] = useRecoilState(
    defaultErrorAlertState
  );
  // 多目的エラーアラート用のstate
  const [multipurposeErrorAlert, setMultipurposeErrorAlert] = useRecoilState(
    multipurposeErrorAlertState
  );
  // 多目的サクセスアラート用のstate
  const [multipurposeSuccessAlert, setMultipurposeSuccessAlert] =
    useRecoilState(multipurposeSuccessAlertState);

  return (
    <div>
      <BasicAlert
        alert={logoutAlert}
        setAlert={setLogoutAlert}
        message="ログアウトしました。"
        warningType="success"
      />
      <BasicAlert
        alert={loginAlert}
        setAlert={setLoginAlert}
        message="ログインしました。"
        warningType="success"
      />
      <BasicAlert
        alert={defaultErrorAlert}
        setAlert={setDefaultErrorAlert}
        message="エラーが発生しました。"
        warningType="error"
      />
      <MultipurposeAlert
        alert={multipurposeErrorAlert.status}
        setAlert={setMultipurposeErrorAlert}
        message={multipurposeErrorAlert.message}
        warningType="error"
      />
      <MultipurposeAlert
        alert={multipurposeSuccessAlert.status}
        setAlert={setMultipurposeSuccessAlert}
        message={multipurposeSuccessAlert.message}
        warningType="success"
      />
    </div>
  );
};

export default Alerts;
