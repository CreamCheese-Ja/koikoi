import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import UserPhoto from "../../atoms/others/UserPhoto";
import BasicDialog from "../../atoms/dialogs/BasicDialog";
import ResizeImageForm from "src/components/modules/forms/ResizeImageForm";
import loadImage from "blueimp-load-image";
import styles from "styles/components/modules/others/inputImage.module.css";

type Props = {
  photoURL: string;
  croppedImage: string;
  setCroppedImage: Dispatch<SetStateAction<string>>;
};

const InputImage = memo((props: Props) => {
  const { photoURL, croppedImage, setCroppedImage } = props;

  const [preview, setPreview] = useState("");
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

  const croppedImageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  };

  return (
    <>
      <div className={styles.photoArea}>
        {croppedImage === "" ? (
          <UserPhoto photoURL={photoURL} width={150} height={150} />
        ) : (
          <div className={styles.croppedImageArea}>
            <img src={croppedImage} alt="preview" style={croppedImageStyle} />
          </div>
        )}
      </div>
      <div className={styles.inputArea}>
        <label>
          <p className={styles.labelWord}>画像を変更</p>
          <input
            type="file"
            name="photo"
            onChange={handleChangeFile}
            className={styles.input}
            accept="image/*"
          />
        </label>
      </div>

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
});

export default InputImage;
