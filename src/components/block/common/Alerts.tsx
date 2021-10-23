import React from "react";
import { useRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import MultipurposeAlert from "../../atoms/alerts/MultipurposeAlert";

const Alerts = () => {
  // エラーアラート用のstate
  const [multipurposeErrorAlert, setMultipurposeErrorAlert] = useRecoilState(
    multipurposeErrorAlertState
  );
  // サクセスアラート用のstate
  const [multipurposeSuccessAlert, setMultipurposeSuccessAlert] =
    useRecoilState(multipurposeSuccessAlertState);

  return (
    <div>
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
