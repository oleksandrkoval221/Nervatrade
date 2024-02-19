"use client";

import styles from "./Form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../loading";
import { useSession, signIn } from "next-auth/react";

import GoogleButton from "../SSOButtons";
import { getMaxListeners } from "events";
import { BsSkipForwardFill } from "react-icons/bs";

type Inputs = {
  email: string;
  username: string;
  password: string;
  termcondition: boolean;
};

const Form = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router?.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      termcondition: false
    },
  });

  const [message, setMessage] = useState<null | string>(null);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { username, email, password } = form;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      res.status === 201 &&
        signIn("email", { email, callbackUrl: '/dashboard' });

      res.status === 500 &&
        setMessage(res.statusText);
    } catch (err: any) {
      setMessage(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      autoComplete="off"
      className={`${styles.form_container}`}
    >
      <fieldset className="w-full">
        <div className="w-full mb-4">
          <label
            htmlFor="username"
            className="w-full font-semibold text-sm !m-0 !mb-1"
          >
            Full name
          </label>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            autoComplete="false"
            className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white placeholder:text-[#343B45] px-3 !m-0 focus:border-2 focus:border-[#4DF986]"
            placeholder="Enter your first and second name"
          />
          {errors.username?.message && (
            <small className="block text-red-600">
              {errors.username.message}
            </small>
          )}
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor="email"
            className="w-full font-semibold text-sm !m-0 !mb-1"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            })}
            type="email"
            autoComplete="off"
            className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white placeholder:text-[#343B45] px-3 !m-0 focus:border-2 focus:border-[#4DF986]"
            placeholder="Enter your email"
          />
          {errors.email?.message && (
            <small className="block text-red-600">{errors.email.message}</small>
          )}
        </div>

        <div className="w-full mb-6">
          <label
            htmlFor="password"
            className="w-full font-semibold text-sm !m-0 !mb-1"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            autoComplete="new-password"
            className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white placeholder:text-[#343B45] px-3 !m-0 focus:border-2 focus:border-[#4DF986]"
            placeholder="********"
          />
          {errors.password?.message && (
            <small className="block text-red-600">
              {errors.password.message}
            </small>
          )}
        </div>
      </fieldset>
      <div className="mb-6">
        <label className="checkbox-container !my-0 !mb-6">
          <p className="font-semibold text-[#626D7C]">
            Creating an account means you’re okay with our <span className="text-[#4DF986]">Terms of Service</span> and <span className="text-[#4DF986]">Privacy Policy</span>.
          </p>
          <input
            {...register("termcondition", {
              required: "You must accept the terms and conditions to register an account",
            })}
            type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
      {errors.termcondition?.message && (
        <small className="block text-red-600">
          {errors.termcondition.message}
        </small>
      )}
      <div className="flex flex-col w-full items-center gap-4 mb-6">
        {message && <small className="block text-red-600">{message}</small>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#4DF986]"
        >
          <img src='/icons/light.svg' className="invert" />
          <span className="font-semibold text-base text-black">Get Started</span>
        </button>
        <div className="w-full">
          <GoogleButton />
        </div>
      </div>
      <p className="font-medium text-[#626D7C] text-center">
        Already a member?
        <Link
          href="/login"
          className="text-[#4DF986] ml-1"
        > SIgn In</Link>
      </p>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
