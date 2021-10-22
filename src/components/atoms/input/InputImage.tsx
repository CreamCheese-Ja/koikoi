import React, { useCallback, useState } from "react";
import UserPhoto from "../others/UserPhoto";
import BasicDialog from "../dialogs/BasicDialog";
import ResizeImageForm from "src/components/modules/forms/ResizeImageForm";
import loadImage from "blueimp-load-image";

type Props = {
  photoURL: string;
};

const InputImage = (props: Props) => {
  const { photoURL } = props;

  const [preview, setPreview] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [running, setRunning] = useState(false);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length !== 0 && files) {
      // 画像サイズが0.5MBより大きくければ圧縮する
      if (files[0].size > 500000) {
        const canvas = await loadImage(files[0], {
          maxWidth: 400,
          maxHeight: 400,
          canvas: true,
        });
        const canvasImage = canvas.image as HTMLCanvasElement;
        canvasImage.toBlob((blob) => {
          setPreview(window.URL.createObjectURL(blob));
          // console.log(blob);
        });
      } else {
        setPreview(window.URL.createObjectURL(files[0]));
        // console.log(files[0]);
      }
      openAndCloseDialog();
    }
  };

  const openAndCloseDialog = useCallback(() => {
    setDialogOpen((status) => !status);
  }, [dialogOpen]);

  return (
    <>
      {croppedImage === "" ? (
        <div style={{ textAlign: "center" }}>
          <UserPhoto photoURL={photoURL} width={150} height={150} />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block" }}>
            <img
              src={croppedImage}
              alt="preview"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      )}
      <label style={{ textAlign: "center" }}>
        <div>
          <p
            style={{
              display: "inline-block",
              color: "#f48fb1",
              cursor: "pointer",
            }}
          >
            画像を変更
          </p>
        </div>
        <input
          type="file"
          name="photo"
          onChange={handleChangeFile}
          style={{ display: "none" }}
          accept="image/*"
        />
      </label>
      <BasicDialog
        title=""
        open={dialogOpen}
        onClick={openAndCloseDialog}
        content={
          <ResizeImageForm
            setCroppedImage={setCroppedImage}
            preview={preview}
            running={running}
            setRunning={setRunning}
            dialogOpen={dialogOpen}
            openAndCloseDialog={openAndCloseDialog}
          />
        }
        running={running}
      />
    </>
  );
};

export default InputImage;
