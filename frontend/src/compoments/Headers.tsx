import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <div className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-lg font-semibold hover:text-blue-300"
        >
          Home
        </Link>
        <Link
          to="/Groups"
          className="text-white text-lg font-semibold hover:text-blue-300"
        >
          Groups
        </Link>
      </div>
    </div>
  );
};

export default Headers;
