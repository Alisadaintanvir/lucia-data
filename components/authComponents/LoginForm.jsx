"use client";
import { useFormState } from "react-dom";
import { signIn } from "@/actions/authActions";
import FormSubmit from "./FormSubmit";

function LoginForm() {
  const [formState, formAction] = useFormState(signIn, {});
  return (
    <form action={formAction} className="flex flex-col w-full">
      <label className="text-gray-800 font-semibold" htmlFor="username">
        Username:
      </label>
      <input
        type="text"
        placeholder="username or email"
        className="my-4 px-4 py-2 border rounded-md text-gray-800"
        name="usernameOrEmail"
        required
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
        required
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

      <FormSubmit text="Login" />
    </form>
  );
}

export default LoginForm;
