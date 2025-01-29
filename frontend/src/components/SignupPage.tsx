import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCreateUser } from "../hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"

interface UserInput {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
}

const SignupPage: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  const [createthesuer, errors, loading]: [
    (input: UserInput) => Promise<boolean>,
    string,
    boolean
  ] = useCreateUser();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [id]: value,
    }));
  };

  const Navigateloginto = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      userInput.email === "" ||
      userInput.password === "" ||
      userInput.phonenumber === "" ||
      userInput.name === ""
    ) {
      toast.error("Please fill in all fields.");
    } else {
      const res = await createthesuer(userInput);

      setUserInput({
        name: "",
        password: "",
        phonenumber: "",
        email: "",
      });
      if (res) {
        toast.success("User created successfully.");
      } else {
        toast.error(errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-100">
      <div className="w-full md:w-1/2 max-w-lg p-8 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Signup</h2>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              id="name"
              className="mt-2 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-2 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={userInput.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              id="phonenumber"
              className="mt-2 block w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
              value={userInput.phonenumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Button>
              {loading ? "singup" : "loading"}
            </Button>
          </div>
        </form>
        <div className="mt-3 flex justify-center">
          <p >
            if you have an account ? <span className="font-bold hover:underline" onClick={Navigateloginto}>Login</span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
