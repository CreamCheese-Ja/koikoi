import logo from "public/images/koikoiLogo.png";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const AppLogo = memo(() => {
  return (
    <Link href="/">
      <a>
        <Image src={logo} width={102} height={44}></Image>
      </a>
    </Link>
  );
});

export default AppLogo;
