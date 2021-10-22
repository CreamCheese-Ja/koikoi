import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import styles from "styles/components/modules/forms/resizeImageForm.module.css";
import getCroppedImg from "src/common/cropImage";
import BasicExecutionButton from "src/components/atoms/buttons/BasicExecutionButton";
import { useSetRecoilState } from "recoil";
import { multipurposeErrorAlertState } from "src/atoms/atom";

type Props = {
  setCroppedImage: Dispatch<SetStateAction<string>>;
  preview: string;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
  openAndCloseDialog: () => void;
};

const ResizeImageForm = (props: Props) => {
  const {
    setCroppedImage,
    preview,
    running,
    setRunning,
    dialogOpen,
    openAndCloseDialog,
  } = props;

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  // エラーアラート
  const setError = useSetRecoilState(multipurposeErrorAlertState);

  // 都度、切り抜きの値を取得する関数
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  // 画像切り抜きの関数
  const cropImage = useCallback(async () => {
    setRunning(true);
    try {
      const croppedImage = await getCroppedImg(
        preview,
        croppedAreaPixels as Area
      );
      if (croppedImage) {
        setCroppedImage(croppedImage);
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
      }
    } catch (error) {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning(false);
    openAndCloseDialog();
  }, [preview, running, dialogOpen, croppedAreaPixels]);

  return (
    <div>
      <div className={styles.area}>
        <div className={styles.cropContainer}>
          <Cropper
            image={preview}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
          />
        </div>
        <div className={styles.controls}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(Number(zoom))}
          />
        </div>
        <div className={styles.button}>
          <BasicExecutionButton
            onClick={cropImage}
            buttonLabel="決定"
            disabled={running}
          />
        </div>
      </div>
    </div>
  );
};

export default ResizeImageForm;
