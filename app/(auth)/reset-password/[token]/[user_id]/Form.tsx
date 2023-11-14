"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import styles from "./Form.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../../loading";
import axios from "axios";

type Inputs = {
  password: string;
  confirm_password: string;
};

const Form = () => {
  const params = useSearchParams()!;
  const session = useSession();
  const router = useRouter();
  const paramData = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      password: "",
      confirm_password: ""
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
    const { password, confirm_password } = form;    
    if(password !== confirm_password) {
      setError("Passwords does not match");
      return;
    }
    axios.post('/api/auth/reset-password',{
      ...paramData,
      password,
    }).then(res => {
      if(res.status === 201){
        router?.push("/login");
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
        Reset password
      </h2>
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
      <fieldset className="w-full px-2 mt-5 flex justify-center items-center flex-col">
        <label
          className="w-full"
          htmlFor="password"
        >
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirm_password", {
            required: "Confirm Password is required",
          })}
          className="p-3 w-full bg-dark-input rounded-lg"
          placeholder="*********"
        />
        {errors.confirm_password?.message && (
          <small className="block text-red-600 w-full">
            {errors.confirm_password.message}
          </small>
        )}
      </fieldset>
      {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )}
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
