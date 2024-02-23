import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth | Verify Request",
};

const VerifyRequest = () => {

  return (
    <section className="w-full max-w-[416px] mx-auto">
      <div className="grid gap-6">
        <div className="grid gap-3">
          <img src="/icons/email.svg" alt="" />
          <h2 className="font-semibold text-3xl leading-9 text-[#FFF]">
            Check your email
          </h2>
          <p className="font-semibold text-base text-[#626D7C]">
            We have sent a password recover instructions to your email.
          </p>
        </div>
        <p className="font-medium text-base gap-1 text-[#626D7C]">
          Didn't receive the email? <span className="text-[#4DF986]">Click to resend</span>
        </p>

        <Link
          href="/login"
          className="w-full h-12 rounded-lg bg-transparent border border-[#343B45] font-semibold text-base text-white flex justify-center items-center gap-2"
        >
          <img src="/icons/back.svg" alt="" />
          <span>
            Back to sign in
          </span>
        </Link>
      </div>
    </section>
  );
};

export default VerifyRequest;
