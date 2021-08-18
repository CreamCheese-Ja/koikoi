import { ReactNode } from "react";
import Header from "./block/Header";
import styles from "styles/layout.module.css";
import Footer from "./block/Footer";
import SideBar from "./block/SideBar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <Header />
      <div className={styles.allContent}>
        <main {...props} className={styles.mainContent}>
          {children}
        </main>
        <SideBar />
      </div>
      <Footer />
    </>
  );
}
