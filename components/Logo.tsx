import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      
    > 
    <div className="flex flex-row justify-between items-center gap-2">
      <Image src="/logo2.png" alt="logo" width={44} height={44} className="block dark:hidden" />
      <Image src="/logo.png" alt="logo" width={44} height={44}  className="hidden dark:block" />
      <span className="font-bold text-3xl  dark:from-cyan-400  dark:to-indigo-400 bg-gradient-to-r from-rose-600 to-amber-500 text-transparent bg-clip-text hover:cursor-pointer background-animate">Pager</span>
    </div>
      
    </Link>
  );
}

export default Logo;