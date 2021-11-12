import Head from "next/head";
import Link from "next/link";
import FluidShape from "src/components/atoms/others/FluidShape";
import styles from "styles/Home.module.css";
import Image from "next/image";
import topImage from "public/images/koikoiTop.svg";
import logo from "public/images/koikoiLogo.png";

export default function Home() {
  return (
    <div>
      <Head>
        <title>恋々 | 恋愛相談SNS</title>
        <meta
          name="description"
          content="誰でも気軽に利用できる恋愛相談SNS。誰もが抱える恋愛の悩みや不安、それらを気軽に共有し自分の恋を成就させよう。"
        />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <Image
                src={topImage}
                width={400}
                height={400}
                alt="topImage"
              ></Image>
            </div>
            <div>
              <FluidShape />
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <div>
            <div className={styles.logo}>
              <Image src={logo} width={153} height={66} alt="logo"></Image>
            </div>
            <p className={styles.description}>
              誰もが抱える恋愛の悩みや不安、それらを気軽に共有できる場所。
              <br />
              見るのも書くのも完全無料。
              <br />
              ちょっとしたことでも大きなことでも、みんなと共有することで考えが変わるかも。
              <br />
              さあ、今すぐ参加して自分の恋を成就させよう！
            </p>
          </div>
          <div className={styles.buttonArea}>
            <div>
              <Link href="/consultations">
                <a>
                  <button className={styles.button}>恋愛相談を見る</button>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/tweets">
                <a>
                  <button className={styles.button}>つぶやきを見る</button>
                </a>
              </Link>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <p>&copy;2021 koikoi</p>
        </footer>
      </div>
    </div>
  );
}
