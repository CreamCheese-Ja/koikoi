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

  // 切り取った画像の表示
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length !== 0 && files) {
      setPreview(window.URL.createObjectURL(files[0]));
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
