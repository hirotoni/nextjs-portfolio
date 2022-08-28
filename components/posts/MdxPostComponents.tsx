import React, { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes, OlHTMLAttributes, ReactNode } from "react";
import Image from "next/image";

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

export const A = (props) => (
  <a {...props} className="text-teal-600 underline">
    {props.children}
  </a>
);

export const P = (props) => <p className="my-4">{props.children}</p>;

export const Ol = (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
  <ol className="list-decimal list-outside pl-6">{props.children}</ol>
);

export const Ul = (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ol className="list-disc list-outside pl-6">{props.children}</ol>
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
  <blockquote className="px-4 py-0.5 italic text-sm border-l-4">{props.children}</blockquote>
);

export const Img = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
  <p className="w-80 mx-auto">
    <Image src={props.src} alt={props.alt} width="100" height="100" layout="responsive" />
  </p>
);
