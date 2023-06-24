"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const name = "Hirotoni";

const EyeCatch = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" ? true : false;

  return (
    <>
      {isHome ? (
        <>
          <div className="flex flex-col items-center">
            <Image priority src="/images/pudding.jpg" className="rounded-full" height={144} width={144} alt={name} />
            <h1 className="text-4xl font-bold leading-loose">{name}</h1>
          </div>
        </>
      ) : (
        <>
          <Link href="/" className="flex flex-col items-center">
            <Image priority src="/images/pudding.jpg" className="rounded-full" height={108} width={108} alt={name} />
            <h2>{name}</h2>
          </Link>
        </>
      )}
    </>
  );
};

export default EyeCatch;
