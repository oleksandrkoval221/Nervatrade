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

  const [btnText, setBtnText] = useState<string | null>("Change password");
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  if (session.status === "authenticated") {
    router?.push("/");
  }

  const formSubmit: SubmitHandler<Inputs> = (form) => {
    const { password, confirm_password } = form;
    if (password !== confirm_password) {
      setError("Passwords does not match");
      return;
    }
    axios.post('/api/auth/reset-password', {
      ...paramData,
      password,
    }).then(res => {
      if (res.status === 201) {
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
      className={`${styles.form_container}`}
    >
      <h2 className="font-semibold text-3xl leading-9 text-[#FFF] mb-3">
        Reset password
      </h2>
      <p className="font-medium text-base text-[#626D7C] mb-3">
        In order to protect your account, make sure your password:
      </p>
      <ul className="grid gap-2 font-medium text-base text-[#626D7C] list-disc pl-5 mb-6">
        <li>Is longer than 8 characters.</li>
        <li>Does not match or significantly contain your username, e.g. do not use 'username123'.</li>
        <li>Is not a member of this list of common passwords.</li>
      </ul>
      <fieldset className="w-full mb-4">
        <label
          className="w-full font-semibold text-sm !m-0 !mb-1"
          htmlFor="password"
        >
          New password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white px-3 !m-0 focus:border-2 focus:border-[#4DF986]"
          placeholder="*********"
        />
        {errors.password?.message && (
          <small className="block text-red-600 w-full">
            {errors.password.message}
          </small>
        )}
      </fieldset>
      <fieldset className="w-full mb-6">
        <label
          className="w-full font-semibold text-sm !m-0 !mb-1"
          htmlFor="password"
        >
          Confirm new password
        </label>
        <input
          type="password"
          {...register("confirm_password", {
            required: "Confirm Password is required",
          })}
          className="w-full h-12 bg-[#151A1F] border border-[#343B45] rounded-lg font-medium text-base text-white px-3 !m-0 focus:border-2 focus:border-[#4DF986]"
          placeholder="*********"
        />
        {errors.confirm_password?.message && (
          <small className="block text-red-600 w-full">
            {errors.confirm_password.message}
          </small>
        )}
      </fieldset>
      {error && (
        <small className="block w-full text-red-600">{error}</small>
      )}
      <div className={`flex flex-col justify-center w-full items-center`}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-lg bg-[#4DF986] font-semibold text-base text-black"
        >
          {btnText}
        </button>
      </div>
      {/* <div className="mt-36">
        <p className="text-center">
          Remember password &nbsp;
          <Link
            href="/login"
            className="text-green-main underline"
          >Log In </Link>
        </p>
      </div> */}
      {isSubmitting && <Loader />}
    </form>
  );
};

export default Form;
