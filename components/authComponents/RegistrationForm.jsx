"use client";
import { useFormState } from "react-dom";
import { signUp } from "@/actions/authActions";
import FormSubmit from "./FormSubmit";
function RegistrationForm() {
  const [formState, formAction] = useFormState(signUp, {});
  return (
    <form action={formAction} className="flex flex-col w-full">
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

      {formState.errors && (
        <ul>
          {Object.keys(formState.errors).map((error) => (
            <li key={error} className="text-red-500">
              {formState.errors[error]}
            </li>
          ))}
        </ul>
      )}

      <FormSubmit text="Create Account" />
    </form>
  );
}

export default RegistrationForm;
