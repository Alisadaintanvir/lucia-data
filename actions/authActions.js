"use server";
import { redirect } from "next/navigation";
import { User } from "@/lib/models";
import connectDB from "@/lib/db";
import { createAuthSession, destroySession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const signUp = async (prevState, formData) => {
  await connectDB();

  const username = formData.get("username");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!username) errors.username = "Username is required";
  if (!password) errors.password = "Password is required";
  if (!email) errors.email = "Email is required";

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const user = new User({
    username,
    name,
    email,
    password,
  });

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await createAuthSession(user._id);
    redirect("../data");
  } catch (err) {
    throw err;
  }
};

export async function signIn(prevState, formData) {
  const usernameOrEmail = formData.get("usernameOrEmail");
  const password = formData.get("password");

  if (!usernameOrEmail || !password) {
    return {
      errors: {
        username: !username && "Username or email is required",
        password: !password && "Password is required",
      },
    };
  }

  const isEmail = usernameOrEmail.includes("@");

  await connectDB();

  const user = isEmail
    ? await User.findOne({ email: usernameOrEmail })
    : await User.findOne({ username: usernameOrEmail });

  if (!user) {
    return {
      errors: {
        username: "User not found",
      },
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      errors: {
        password: "Invalid password",
      },
    };
  }

  await createAuthSession(user._id);
  redirect("../data");
}

export const logout = async () => {
  await destroySession();
  redirect("../login");
};
