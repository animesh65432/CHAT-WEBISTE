import { useState } from "react";
import useCreateuser from "../hooks/useCreateuser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  });
  const [createthesuer, errors] = useCreateuser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [id]: value,
    }));
  };

  const Navigateloginto = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userInput.email === "" ||
      userInput.password === "" ||
      userInput.phonenumber == "" ||
      userInput.name == ""
    ) {
      toast.error("please fill up each and everything");
    } else {
      let res = await createthesuer(userInput);

      setUserInput({
        name: "",
        password: "",
        phonenumber: "",
        email: "",
      });
      if (res) {
        toast.success("Sucessfully create The account");
      } else {
        toast.error(errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name :
            </label>
            <input
              id="name"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Please put your name here"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Please put your email here"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Please put your password here"
              value={userInput.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <input
              id="phonenumber"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Please put your phone number here"
              value={userInput.phonenumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Signin
            </button>
          </div>
        </form>
        <button
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={Navigateloginto}
        >
          login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SigninPage;
