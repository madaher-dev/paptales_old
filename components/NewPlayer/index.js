"use client";

import { useSession } from "next-auth/react";

import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewPlayer() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = session?.user ?? { id: null };

  let [loading, setLoading] = useState(false);

  let [formValues, setFormValues] = useState({
    name: "",
    age: 5,
    gender: "",
    style: "",
    language: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/user/${id}/`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  return (
    <div className="row-span-3 bg-blue-200 flex items-center justify-center flex-col">
      <div className="bg-white p-16 rounded shadow-lg flex items-center justify-center flex-col">
        <h1 className="text-xl font-bold text-center">Add new player</h1>
        <div className="row-span-1 flex items-center justify-center">
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age: {formValues.age}
                </label>
                <input
                  id="age"
                  name="age"
                  type="range"
                  min="1"
                  max="16"
                  required
                  className="mt-1 block w-full"
                  value={formValues.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Gender
                </span>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="boy"
                      checked={formValues.gender === "boy"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Boy</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value="girl"
                      checked={formValues.gender === "girl"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Girl</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">Style</h3>
                <div className="flex justify-between mt-2">
                  <label className="text-center">
                    <input
                      type="radio"
                      name="style"
                      value="fairy"
                      checked={formValues.style === "fairy"}
                      onChange={handleChange}
                    />
                    <Image
                      src="/images/fairytales.jpg"
                      alt="Fairy Tale"
                      width={50}
                      height={50}
                    />
                    <p>Fairy Tale</p>
                  </label>
                  <label className="text-center">
                    <input
                      type="radio"
                      name="style"
                      value="adventure"
                      checked={formValues.style === "adventure"}
                      onChange={handleChange}
                    />
                    <Image
                      src="/images/adventure.jpg"
                      alt="Adventure"
                      width={50}
                      height={50}
                    />
                    <p>Adventure</p>
                  </label>
                  <label className="text-center">
                    <input
                      type="radio"
                      name="style"
                      value="fun"
                      checked={formValues.style === "fun"}
                      onChange={handleChange}
                    />
                    <Image
                      src="/images/fun.jpg"
                      alt="Fun"
                      width={50}
                      height={50}
                    />
                    <p>Fun</p>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
                  value={formValues.language}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="russian">Russian</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
