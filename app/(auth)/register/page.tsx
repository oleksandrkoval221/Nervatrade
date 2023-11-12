import { Metadata } from "next";

import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Register",
};

const Register = () => {
  return (
    <main className="pb-12">
      <section className="mx-auto max-w-sm">
        <h2 className='mt-12 text-xl sm:text-2xl font-bold font-Poppins'>
          Create Account
        </h2>
        <Form />
      </section>
    </main>
  );
};

export default Register;
