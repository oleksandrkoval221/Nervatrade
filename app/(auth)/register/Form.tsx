"use client";

import styles from "./Form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../loading";
import { useSession } from "next-auth/react";

import GoogleButton from "../SSOButtons";

type Inputs = {
  email: string;
  username: string;
  password: string;
};

const Form = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router?.push("/my/dashboard");
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
        router.push("/login?success=Account has been created");
    } catch (err: any) {
      setMessage(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      autoComplete="off"
      className={`${styles.form_container} flex justify-center items-center flex-col`}
    >
      <fieldset className="w-full mx-4 flex justify-center items-center flex-col">
        <div className="w-full px-2 mt-5">
          <label
            htmlFor="username"
            className="text-sm"
          >
            Username
          </label>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            autoComplete="false"
            className="p-3 w-full bg-dark-input rounded-lg"
            placeholder="Your username"
          />
          {errors.username?.message && (
            <small className="block text-red-600">
              {errors.username.message}
            </small>
          )}
        </div>
        <div className="w-full px-2 mt-5">
          <label
            htmlFor="email"
            className="text-sm"
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
            className="p-3 w-full bg-dark-input rounded-lg"
            placeholder="Your email"
          />
          {errors.email?.message && (
            <small className="block text-red-600">{errors.email.message}</small>
          )}
        </div>

        <div className="w-full px-2 mt-5">
          <label
            htmlFor="password"
            className="text-sm"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            autoComplete="new-password"
            className="p-3 w-full bg-dark-input rounded-lg"
            placeholder="********"
          />
          {errors.password?.message && (
            <small className="block text-red-600">
              {errors.password.message}
            </small>
          )}
        </div>
      </fieldset>
      <div className="flex mt-5 justify-start items-center gap-2 w-full px-1">
        <label className="checkbox-container">I accept the terms and privacy policy
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="flex flex-col w-full items-center px-1 mt-5 gap-6">
        {message && <small className="block text-red-600">{message}</small>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-center flex-1 w-full bg-green-main font-semibold rounded-lg p-[1rem] px-4 text-black cursor-pointer"
        >
          Register
        </button>
        <p>Other sign up options</p>
        <GoogleButton />
      </div>
      <div className="mt-16">
        <p className="w-full text-left">
          Already have an account?
          <Link
            href="/login"
            className="text-green-main hover:underline"
          > Log in</Link>
        </p>
      </div>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
