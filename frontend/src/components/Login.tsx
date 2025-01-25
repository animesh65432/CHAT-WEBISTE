import React, { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useloginhook } from "../hooks";
import { Button } from "@/components/ui/button"

interface UserInput {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [userinput, setuserinput] = useState<UserInput>({
    email: "test@gmail.com",
    password: "testpassword",
  });

  const [loginuser, errors] = useloginhook();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setuserinput((prevUserInput) => ({
      ...prevUserInput,
      [id]: value,
    }));
  };

  const Navigatetosignin = () => {
    navigate("/");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userinput.email === "" || userinput.password === "") {
      toast.error("Please fill each and every field");
    } else {
      const res = await loginuser(userinput);
      if (res) {
        toast.success("Successfully logged in");
      } else {
        toast.error(errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white px-8 py-10 shadow-lg rounded-3xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back!
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Enter your email and password to log in.
          </p>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address:
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              value={userinput.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 "
              placeholder="Enter your password"
              value={userinput.password}
              onChange={handleInputChange}
            />

          </div>
          <div className="mt-8 flex justify-center">
            <Button type="submit" className="font-mono">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={Navigatetosignin}
              className="text-slate-950 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
