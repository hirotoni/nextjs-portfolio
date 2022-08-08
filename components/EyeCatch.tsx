import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isHome: boolean;
};

const name = "Hirotoni";

const EyeCatch = (props: Props) => {
  return (
    <>
      {props.isHome ? (
        <>
          <div className="flex flex-col items-center">
            <Image priority src="/images/pudding.jpg" className="rounded-full" height={144} width={144} alt={name} />
            <h1 className="text-4xl font-bold leading-loose">{name}</h1>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/pudding.jpg"
                  className="rounded-full"
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className="">
              <Link href="/">
                <a className="">{name}</a>
              </Link>
            </h2>
          </div>
        </>
      )}
    </>
  );
};

export default EyeCatch;
