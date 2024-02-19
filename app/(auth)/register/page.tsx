import { Metadata } from "next";

import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Register",
};

const Register = () => {
  return (
    <section className="w-full max-w-[416px] py-12 lg:py-32 mx-auto">
      <h2 className='font-semibold text-3xl leading-9 text-[#FFF] mb-3'>
        Create an account
      </h2>
      <p className="font-medium text-base text-[#626D7C] mb-6">
        Get assets to speed up your workflow or check out my collection of useful materials to make better products yourself.
      </p>
      <Form />
    </section>
  );
};

export default Register;
