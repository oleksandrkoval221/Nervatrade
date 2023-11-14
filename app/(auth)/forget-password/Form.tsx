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

  const [btnText, setBtnText] = useState<string | null>("Reset password");
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  if (session.status === "authenticated") {
    router?.push("/");
  }

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { email } = form;    
    axios.post('/api/auth/reset-password-link',{
      email
    }).then(res => {
      console.log('res ===>>> ', res.data);
      if(res.status === 201){
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
      <h2 className="leading-[1.15] mt-12 mx-auto w-full px-2 text-xl my-6 sm:text-2xl font-bold  font-Poppins">
        Forgot password?
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
      {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )}
      {
        btnText !== "Reset password" && 
        <div className="px-2">We've sent a link for reset password to your email</div>
      }
      <div className={`flex flex-col justify-center w-full items-center px-2`}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-center flex-1 w-full bg-green-main font-semibold rounded-lg p-[0.7rem] px-4 text-black cursor-pointer mt-5"
        >
            { btnText }
        </button>
      </div>
      <div className="mt-36">
        <p className="text-center">
          Remember password &nbsp;
          <Link
            href="/login"
            className="text-green-main underline"
          >Log In </Link>
        </p>
      </div>
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
