"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";


const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/";
  }

  return (
    <div className="flex justify-center gap-4">
      <div
        onClick={() => signIn("facebook", { callbackUrl })}
        className="flex items-center justify-center cursor-pointer bg-[#EAECEF] rounded-full w-14 h-14"
      >
        <FaFacebookF size={20} className="text-dark-second" />
      </div>
      <div
        onClick={() => signIn("google", { callbackUrl })}
        className="flex items-center justify-center cursor-pointer bg-[#EAECEF] rounded-full w-14 h-14"
      >
        <FcGoogle size={20} />
      </div>
      <div
        onClick={() => signIn("apple", { callbackUrl })}
        className="flex items-center justify-center cursor-pointer bg-[#EAECEF] rounded-full w-14 h-14"
      >
        <FaApple size={20} className="text-dark-main" />
      </div>
    </div>
  );
};

export default GoogleButton;
