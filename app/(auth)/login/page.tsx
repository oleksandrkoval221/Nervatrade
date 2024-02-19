import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Login",
};

export default function Login() {
  return (
    <main className="w-full max-w-[416px] pt-12 pb-20 lg:py-32 mx-auto">
      <Form />
    </main>
  );
}
