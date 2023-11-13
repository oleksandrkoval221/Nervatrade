import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth | Verify Request",
};

const VerifyRequest = () => {

  return (
    <section className="mx-auto max-w-sm">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Check your email
            </h2>
          </div>
          <div>
            <p className="text-center">
              A sign in link has been sent to your email address.
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/" className="mt-8 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-green-main hover:bg-grean-second sm:w-auto">
                Go to Home
            </Link>
          </div>
        </div>
        </div>
    </section>
  );
};

export default VerifyRequest;
