"use client";

import { useSession } from "next-auth/react";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "../Auth";
import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function Signup() {
  const time = new Date().getHours() < 12 ? "today" : "tonight";

  let [loading1, setLoading1] = useState(false);
  let [loading2, setLoading2] = useState(false);
  let [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSignUp = async (e) => {
    e.preventDefault();
    setLoading1(true);

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading1(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }
      console.log("hello");
      // signIn('credentials', { redirect: false, password: 'password' })
      signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        // callbackUrl: "https://paptales.vercel.app/",
        redirect: false,
      });
    } catch (error) {
      setLoading1(false);
      console.error(error);
      alert(error.message);
    }
  };
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading2(true);
    signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      // callbackUrl: "/",
      // callbackUrl: "https://paptales.vercel.app/",
      redirect: false,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { data: session } = useSession();

  return (
    <div className="bg-white p-16 rounded shadow-lg flex items-center justify-center flex-col">
      <h1 className="text-xl font-bold text-center">
        Who are we reading for {time}?
      </h1>
      <div className="row-span-1 flex items-center justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Your Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                required
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading1 || loading2}
                onClick={onSignUp}
              >
                {loading1 ? "loading..." : "Sign Up"}
              </button>
              <button
                className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading1 || loading2}
                onClick={onLogin}
              >
                {loading2 ? "loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
