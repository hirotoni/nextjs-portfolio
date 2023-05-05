import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useOutsideClickHandler } from "../hooks/customhooks";
import styles from "./Navbar.module.css";
import { GoMarkGithub } from "react-icons/go";

type NavbarProps = {
  enableFadeOutOnScroll?: boolean;
};

const Navbar = (props: NavbarProps) => {
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
    if (!props.enableFadeOutOnScroll) {
      return;
    }

    const headerHeight = headerRef.current.clientHeight;
    const screenHeight = window.screen.height;
    const offset = headerHeight + 200;

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
        <Link href="/">
          <button disabled={disabled}>
            <strong className="text-lg">Hirotoni</strong>
          </button>
        </Link>
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
          <Link href="/#aboutme">
            <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
              About Me
            </button>
          </Link>
          <Link href="/#techstacks">
            <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
              Teck Stacks
            </button>
          </Link>
          <Link href="/#posts">
            <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
              Posts
            </button>
          </Link>
          <Link href="/tags">
            <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/50">
              Tags
            </button>
          </Link>
          <button onClick={onClickLink} disabled={disabled} className="w-full hover:bg-slate-400/90">
            <a href="https://github.com/hirotoni/nextjs-portfolio" target="_blank">
              <div className="flex flex-row justify-center items-center gap-2">
                <GoMarkGithub />
                <div>View Source</div>
              </div>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
