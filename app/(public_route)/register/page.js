import { addUser } from "@/actions/authActions";
import Link from "next/link";

function RegisterPage() {
  return (
    <section className="h-screen flex justify-center items-center pt-20">
      <div className="content-box container w-full md:w-1/3 bg-white rounded-md p-10 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
        <form action={addUser} className="flex flex-col w-full">
          <label className="text-gray-800 font-semibold" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            placeholder="username"
            className="my-4 px-4 py-2 border rounded-md text-gray-800"
            name="username"
          />
          <label className="text-gray-800 font-semibold" htmlFor="username">
            Full Name:
          </label>
          <input
            type="text"
            placeholder="Your Full Name"
            className="my-4 px-4 py-2 border rounded-md text-gray-800"
            name="name"
          />
          <label className="text-gray-800 font-semibold" htmlFor="username">
            Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            className="my-4 px-4 py-2 border rounded-md text-gray-800"
            name="email"
          />

          <label className="text-gray-800 font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            className="my-4 px-4 py-2 border rounded-md text-gray-800"
            name="password"
            autoComplete="on"
          />

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-md mt-5"
          >
            Create Account
          </button>
        </form>
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
