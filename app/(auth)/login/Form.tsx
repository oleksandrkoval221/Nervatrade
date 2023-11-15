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
    router?.push("/");
  }

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className={`${styles.form_container} flex justify-center items-center flex-col`}
    >
      <h2 className="leading-[1.15] mt-12 mx-auto w-full px-2 text-xl my-6 sm:text-2xl font-bold  font-Poppins">
        Log In
      </h2>

      <fieldset className="w-full px-2 flex justify-center items-center flex-col">
        <label
          className="w-full "
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
          className="p-3 w-full bg-dark-input rounded-lg"
          placeholder="Your email"
        />
        {errors.email?.message && (
          <small className="block text-red-600 w-full">
            {errors.email.message}
          </small>
        )}
      </fieldset>
      <fieldset className="w-full px-2 mt-5 flex justify-center items-center flex-col">
        <label
          className="w-full"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="p-3 w-full bg-dark-input rounded-lg"
          placeholder="*********"
        />
        {errors.password?.message && (
          <small className="block text-red-600 w-full">
            {errors.password.message}
          </small>
        )}
      </fieldset>
      <div className={`flex flex-col justify-center w-full items-center px-2`}>
        <div className="w-full text-right mt-4 cursor-pointer">
          <Link href='/forget-password'>Forgot password?</Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-center flex-1 w-full bg-green-main font-semibold rounded-lg p-[0.7rem] px-4 text-black cursor-pointer mt-5"
        >
          Log in
        </button>
        {error && (
          <small className="block w-full mt-3 px-2 text-red-600">{error}</small>
        )}
        <p
          className={`py-6 text-[#707a8a] text-center ${styles.login_continue}`}
        >
          <span className="mr-1 "> Or Login with</span>
        </p>
      </div>
      <div className="flex w-full justify-center px-2 text-lg items-center">
        <GoogleButton />
      </div>
      <div className="mt-16">
        <p className="text-center">
          Already have an account?
          <Link
            href="/register"
            className="text-green-main underline"
          > Sign up</Link>
        </p>
      </div>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
