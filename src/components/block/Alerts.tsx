import React from "react";
import { useRecoilState } from "recoil";
import { logoutAlertState, loginAlertState } from "src/atoms/atom";
import AlertMessage from "../atoms/AlertMessage";

const Alerts = () => {
  const [logoutAlert, setLogoutAlert] = useRecoilState(logoutAlertState);
  const [loginAlert, setLoginAlert] = useRecoilState(loginAlertState);

  return (
    <div>
      <AlertMessage
        alert={logoutAlert}
        setAlert={setLogoutAlert}
        message="ログアウトしました。"
        warningType="success"
      />
      <AlertMessage
        alert={loginAlert}
        setAlert={setLoginAlert}
        message="ログインしました。"
        warningType="success"
      />
    </div>
  );
};

export default Alerts;
