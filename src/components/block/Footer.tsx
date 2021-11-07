import React from "react";
import useMedia from "use-media";
import FooterNav from "./nav/FooterNav";

const Footer = () => {
  const isWide = useMedia({ minWidth: 961 });

  const footerStyle: { [key: string]: string } = {
    textAlign: "center",
    borderTop: "1px solid #dadada",
    paddingTop: "10px",
    marginBottom: isWide ? "0px" : "60px",
  };
  return (
    <footer style={footerStyle}>
      <FooterNav />
      <p>&copy;2021 koikoi</p>
    </footer>
  );
};

export default Footer;
