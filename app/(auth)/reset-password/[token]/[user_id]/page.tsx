import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Reset Password",
};

export default function ForgetPassword() {
  return (
    <main className="w-full max-w-[416px] py-12 lg:py-32 mx-auto">
      <Form />
    </main>
  );
}
