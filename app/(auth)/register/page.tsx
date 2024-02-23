import { Metadata } from "next";

import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Register",
};

const Register = () => {
  return (
    <section className="w-full max-w-[416px] flex flex-col items-center justify-center mx-auto">
      <h2 className='font-semibold text-3xl leading-9 text-[#FFF] mb-6'>
        Create an account
      </h2>
      <Form />
    </section>
  );
};

export default Register;
