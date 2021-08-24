import React from "react";
import { useRecoilState } from "recoil";
import { logoutAlertState } from "src/atoms/atom";
import AlertMessage from "./AlertMessage";

const Alerts = () => {
  const [logoutAlert, setLogoutAlert] = useRecoilState(logoutAlertState);

  return (
    <div>
      <AlertMessage
        alert={logoutAlert}
        setAlert={setLogoutAlert}
        message="ログアウトしました。"
        warningType="success"
      />
    </div>
  );
};

export default Alerts;
