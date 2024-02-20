"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./Form.module.css";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleButton from "../SSOButtons";
import Loader from "../loading";

type Inputs = {
  email: string;
  password: string;
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
      password: "",
    },
  });

  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
    }, { callbackUrl: '/dashboard' });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className={`${styles.form_container} flex justify-center items-center flex-col`}
    >
      <h2 className="w-full font-semibold text-3xl leading-9 text-white mb-3">
        Welcome back!
      </h2>
      <p className="w-full font-medium text-base text-[#626D7C] mb-6">
        Sign In to access your dashboard and settings.
      </p>
      <fieldset className="w-full mb-4">
        <label
          className="w-full font-semibold text-sm !m-0 !mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
          className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white px-3 !m-0 focus:border-2 focus:border-[#4DF986] placeholder:text-[#343B45]"
          placeholder="Enter your email"
        />
        {errors.email?.message && (
          <small className="block text-red-600 w-full">
            {errors.email.message}
          </small>
        )}
      </fieldset>
      <fieldset className="w-full mb-6">
        <label
          className="w-full font-semibold text-sm !m-0 !mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white px-3 !m-0 focus:border-2 focus:border-[#4DF986] placeholder:text-[#343B45]"
          placeholder="Enter your password"
        />
        {errors.password?.message && (
          <small className="block text-red-600 w-full">
            {errors.password.message}
          </small>
        )}
      </fieldset>
      <div className="flex flex-col justify-center w-full items-center mb-4">
        <div className="w-full text-right cursor-pointer mb-6">
          <Link href='/forget-password' className="font-medium text-base text-[#4DF986]">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#4DF986]"
        >
          <img src='/icons/login.svg' />
          <span className="font-semibold text-base text-black">Sign In</span>
        </button>
        {error && (
          <small className="block w-full mt-3 px-2 text-red-600">{error}</small>
        )}
      </div>
      <div className="w-full mb-6">
        <GoogleButton />
      </div>
      <p className="font-medium text-[#626D7C] text-center">
        Don't have an account?
        <Link
          href="/register"
          className="text-[#4DF986] ml-1"
        >
          Sign up
        </Link>
      </p>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
