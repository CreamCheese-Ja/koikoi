import React from "react";
import FooterNav from "./nav/FooterNav";
import styles from "styles/components/block/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterNav />
      <p>&copy;2021 koikoi</p>
    </footer>
  );
};

export default Footer;
