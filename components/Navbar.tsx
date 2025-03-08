"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogoGithub } from "react-icons/io";
import styles from "@/components/Navbar.module.css";
import { useOutsideClickHandler } from "@/hooks/customhooks";

type NavbarProps = {
  enableFadeOutOnScroll?: boolean;
};

const Navbar = (props: NavbarProps) => {
  const pathname = usePathname();
  const isPost = pathname?.startsWith("/posts/");
  const ref = useRef(null);
  const [hidden, setHidden] = useState(true);

  const onClickHamburgerIcon = () => {
    setHidden(!hidden);
  };
  const onClickLink = () => {
    setHidden(true);
  };

  useOutsideClickHandler(ref, (e) => setHidden(true));

  const headerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (!isPost) {
      return;
    }

    const headerHeight = headerRef.current?.clientHeight;
    const screenHeight = window.screen.height;
    const offset = headerHeight ? headerHeight + 200 : 200;

    const didScrollPage = (e) => {
      let calc = 1 - (window.scrollY - offset + screenHeight) / screenHeight;
      let disabled = false;
      // console.log(calc);
      if (calc > 1) {
        calc = 1;
      } else if (calc >= 0.2) {
        calc = 1;
      } else if (calc < 0.2 && calc >= 0) {
        disabled = true;
      } else if (calc < 0) {
        calc = 0;
        disabled = true;
      }

      // console.log("window.scrollY: " + window.scrollY);
      // console.log("headerHeight: " + headerHeight);
      // console.log("screenHeight: " + screenHeight);
      // console.log("calc: " + calc);
      // console.log("disabled: " + disabled);

      setOpacity(calc);
      setDisabled(disabled);
    };
    window.addEventListener("scroll", didScrollPage);
    return () => {
      window.removeEventListener("keydown", didScrollPage);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      style={{ opacity: opacity }}
      className={`container mx-auto z-10 py-2 sticky top-0 bg-white/40 backdrop-blur-sm`}
    >
      <div className="flex flex-row justify-between items-center px-1">
        <button disabled={disabled}>
          <Link href="/">
            <strong className="text-lg">Hirotoni</strong>
          </Link>
        </button>
        <button className="border-2 rounded-md p-1 border-black" onClick={onClickHamburgerIcon} disabled={disabled}>
          <GiHamburgerMenu />
        </button>
      </div>

      <div
        className={`rounded bg-slate-300 absolute right-5 mt-3 shadow-lg opacity-0 ${styles.fadeIn}`}
        hidden={hidden}
        ref={ref}
      >
        <div className="flex flex-col divide-y leading-10 items-start w-40">
          <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
            <Link href="/#aboutme">About Me</Link>
          </button>
          <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
            <Link href="/#techstacks">Teck Stacks</Link>
          </button>
          <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
            <Link href="/#posts">Posts</Link>
          </button>
          <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
            <Link href="/tags">Tags</Link>
          </button>
          <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/90">
            <Link href="https://github.com/hirotoni/nextjs-portfolio" target="_blank">
              <div className="flex flex-row justify-center items-center gap-2">
                <IoLogoGithub />
                <div>View Source</div>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
