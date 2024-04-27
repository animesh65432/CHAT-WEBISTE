import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useloginhook from "../hooks/useloginhook";

const LoginPage = () => {
  const [userinput, setuserinput] = useState({
    email: "",
    password: "",
  });
  const [loginuser, errors] = useloginhook();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setuserinput((prevUserInput) => ({
      ...prevUserInput,
      [id]: value,
    }));
  };

  const Navigatetosignin = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userinput.email == "" || userinput.password == "") {
      toast.error("please fill each and every filed");
    } else {
      let res = await loginuser(userinput);
      if (res) {
        toast.success("Sucessfully login");
      } else {
        toast.error(errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit}>
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
              value={userinput.email}
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
              value={userinput.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              login
            </button>
          </div>
        </form>
        <button
          onClick={Navigatetosignin}
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create New User
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;