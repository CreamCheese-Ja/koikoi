import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import React, { useCallback, useState } from "react";
import PostMenu from "src/components/modules/menu/PostMenu";
import useMedia from "use-media";

const FloatingButton = () => {
  const isWide = useMedia({ minWidth: 961 });

  // 投稿メニュー用state
  const [postMenu, setPostMenu] = useState<null | HTMLElement>(null);
  // 投稿メニュー開
  const openPostMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setPostMenu(event.currentTarget);
    },
    [postMenu]
  );

  const buttonStyle: { [key: string]: string } = {
    position: "fixed",
    bottom: "70px",
    right: "10px",
  };

  return (
    <>
      {isWide ? (
        <></>
      ) : (
        <div>
          <Fab
            color="primary"
            aria-label="post"
            style={buttonStyle}
            onClick={openPostMenu}
          >
            <EditIcon color="secondary" />
          </Fab>
          <PostMenu postMenu={postMenu} setPostMenu={setPostMenu} />
        </div>
      )}
    </>
  );
};

export default FloatingButton;
