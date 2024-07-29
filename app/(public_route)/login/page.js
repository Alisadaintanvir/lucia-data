import LoginForm from "@/components/authComponents/LoginForm";
import Link from "next/link";

function LoginPage() {
  return (
    <section className="h-screen flex justify-center items-center ">
      <div className="content-box w-1/3 bg-white rounded-md p-10 flex flex-col items-center justify-center space-y-8 shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Login Page</h2>
        <LoginForm />
        <p className="text-gray-800 mt-4">
          Don&apos;t have an account?{" "}
          <Link className="font-bold " href="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
