"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./Form.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../loading";
import axios from "axios";

type Inputs = {
  email: string;
};

const Form = () => {
  const params = useSearchParams()!;
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  });

  const [btnText, setBtnText] = useState<string | null>("Send link to email");
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  if (session.status === "authenticated") {
    router?.push("/");
  }

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { email } = form;
    axios.post('/api/auth/reset-password-link', {
      email
    }).then(res => {
      console.log('res ===>>> ', res.data);
      if (res.status === 201) {
        setError("");
        setBtnText("Send Again");
      }
    }).catch(err => {
      console.log("err ==>>> ", err)
      setError(err?.response?.data);
    })
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className={`${styles.form_container} flex justify-center items-center flex-col`}
    >
      <h2 className="w-full font-semibold text-3xl text-[#FFF] leading-9 mb-3">
        Reset your password
      </h2>
      <p className="font-medium text-base text-[#626D7C] mb-6">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <fieldset className="w-full mb-6">
        <label
          className="w-full font-semibold text-sm !m-0 !mb-1"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
          className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white px-3 !m-0 focus:border-2 focus:border-[#4DF986]"
          placeholder="Enter your email"
        />
        {errors.email?.message && (
          <small className="block text-red-600 w-full">
            {errors.email.message}
          </small>
        )}
      </fieldset>
      {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )}
      {
        btnText !== "Send link to email" &&
        <div className="px-2">We've sent a link for reset password to your email</div>
      }
      <div className={`flex flex-col justify-center w-full items-center mb-4`}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#4DF986] font-semibold text-base text-black"
        >
          {btnText}
        </button>
      </div>
      <Link
        href="/login"
        className="w-full h-12 rounded-lg bg-transparent border border-[#343B45] font-semibold text-base text-white flex justify-center items-center gap-2"
      >
        <img src="/icons/back.svg" alt="" />
        <span>
          Back to sign in
        </span>
      </Link>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
