import RegistrationForm from "@/components/authComponents/RegistrationForm";
import Link from "next/link";

function RegisterPage() {
  return (
    <section className="h-screen pt-20 pb-2 flex justify-center items-center ">
      <div className="content-box container w-full md:w-1/3 bg-white rounded-md p-10 flex flex-col items-center justify-center space-y-8 shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
        <RegistrationForm />
        <p className="text-gray-800 mt-4">
          Already have an account?{" "}
          <Link className="font-bold " href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
