import React from "react";

const Joinusers = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <form>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          UserName
        </label>
        <input
          type="text"
          id="username"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
        />
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Join
        </button>
      </form>
    </div>
  );
};

export default Joinusers;
