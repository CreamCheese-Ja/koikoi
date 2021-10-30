import React from "react";
import FooterNav from "./nav/FooterNav";

const Footer = () => {
  const footerStyle: { [key: string]: string } = {
    textAlign: "center",
    borderTop: "1px solid #dadada",
    paddingTop: "10px",
  };
  return (
    <footer style={footerStyle}>
      <FooterNav />
      <p>&copy;2021 koikoi</p>
    </footer>
  );
};

export default Footer;
