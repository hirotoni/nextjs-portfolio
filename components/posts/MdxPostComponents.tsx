"use client";

import React, {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useOutsideClickHandler } from "@/hooks/customhooks";

/**
 * if you want to use rehype plugins result,
 * <h1 {...props}> spreads their result such as props.id
 */
export const Main = (props) => <main className="text-base leading-6">{props.children}</main>;

export const H1 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h1 {...props} className="text-2xl border-b-4 border-b-teal-600 mt-4 mb-2 font-bold">
    {props.children}
  </h1>
);

export const H2 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h2 {...props} className="text-xl mt-4 mb-2 font-bold border-l-8 pl-2 border-l-teal-600">
    {props.children}
  </h2>
);

export const H3 = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
  <h3 {...props} className="text-base mt-4 mb-2 font-bold before:content-['■_'] before:text-teal-600">
    {props.children}
  </h3>
);

export const A = (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
  <a {...props} className="text-teal-600 underline">
    {props.children}
  </a>
);

export const P = (props) => <div className="my-4">{props.children}</div>;

export const Ol = (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
  <ol className="list-decimal list-outside pl-8">{props.children}</ol>
);

export const Ul = (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul className="list-disc list-outside pl-8">{props.children}</ul>
);

export const Pre = (props) => (
  <pre className={`bg-slate-200 rounded my-2 p-3 overflow-x-auto ${props.className}`}>{props.children}</pre>
);

export const Code = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <code className={`text-sm`}>{props.children}</code>
);

export const Table = (props: { children?: ReactNode }) => (
  <div className="prose max-w-full overflow-x-auto">
    <table className="">{props.children}</table>
  </div>
);

export const Blockquote = (props) => (
  <blockquote className="px-4 py-0.5 italic text-sm border-l-4 overflow-auto">{props.children}</blockquote>
);

export const Img = (props) => {
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(true);
  };

  const ref = useRef(null);
  useOutsideClickHandler(ref, (e) => {
    setClicked(false);
  });

  return (
    <>
      <p className="mx-auto w-2/3" onClick={onClick}>
        <Image src={props.src} alt={props.alt} width="100" height="100" layout="responsive" />
      </p>
      <div
        className={`fixed top-0 left-0 w-screen bg-slate-300/50 transition-all duration-200 ${
          clicked ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      >
        <div className="flex flex-col h-screen justify-center items-center">
          <div className="w-4/5 md:w-3/5 lg:w-2/5" ref={ref}>
            <Image src={props.src} alt={props.alt} width="100" height="100" layout="responsive" />
          </div>
        </div>
      </div>
    </>
  );
};

export const Hr = (props) => {
  return <hr className="my-5 border-2" />;
};
