"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF, FaApple } from "react-icons/fa";


const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/dashboard";
  }

  return (
    <div className="flex justify-center gap-4">
      {/* <div
        onClick={() => signIn("facebook", { callbackUrl })}
        className="flex items-center justify-center cursor-pointer bg-[#EAECEF] rounded-full w-14 h-14"
      >
        <FaFacebookF size={20} className="text-dark-second" />
      </div> */}
      <div
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full h-12 flex items-center bg-[#4285F4] rounded-lg p-0.5 cursor-pointer"
      >
        <div className="w-11 h-11 flex flex-shrink-0 items-center justify-center bg-[#FFF] rounded-md">
          <FcGoogle size={20} />
        </div>
        <p className="w-full font-semibold text-[#FFF] text-center">
          Sign in with Google
        </p>
      </div>
      {/* <div
        onClick={() => signIn("apple", { callbackUrl })}
        className="flex items-center justify-center cursor-pointer bg-[#EAECEF] rounded-full w-14 h-14"
      >
        <FaApple size={20} className="text-dark-main" />
      </div> */}
    </div>
  );
};

export default GoogleButton;
