import { Metadata } from "next";

import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Register",
};

const Register = () => {
  return (
    <section className="mx-auto max-w-sm">
      <h2 className='text-xl sm:text-2xl font-bold font-Poppins px-2'>
        Create Account
      </h2>
      <Form />
    </section>
  );
};

export default Register;
