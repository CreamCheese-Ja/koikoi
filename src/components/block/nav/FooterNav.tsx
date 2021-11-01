import React, { useState } from "react";
import BasicDialog from "src/components/atoms/dialogs/BasicDialog";
import ContactForm from "src/components/modules/forms/ContactForm";
import styles from "styles/components/block/nav/footerNav.module.css";

const FooterNav = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [sendMessageRunning, setSendMessageRunning] = useState(false);
  // お問い合わせダイアログ開閉
  const openCloseContactDialog = () => {
    setShowContactForm((status) => !status);
  };
  return (
    <div>
      <ul className={styles.navList}>
        <li>利用規約</li>
        <li>プライバシー</li>
        <li onClick={openCloseContactDialog} style={{ cursor: "pointer" }}>
          お問い合わせ
        </li>
      </ul>
      <BasicDialog
        title="お問い合わせ"
        open={showContactForm}
        onClick={openCloseContactDialog}
        content={
          <ContactForm
            running={sendMessageRunning}
            setRunning={setSendMessageRunning}
            openCloseDialog={openCloseContactDialog}
          />
        }
        running={sendMessageRunning}
      />
    </div>
  );
};

export default FooterNav;
