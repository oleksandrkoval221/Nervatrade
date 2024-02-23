import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Auth | Login",
};

export default function Login() {
  return (
    <main className="w-full max-w-[416px] mx-auto">
      <Form />
    </main>
  );
}
