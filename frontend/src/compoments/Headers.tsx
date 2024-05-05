import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/Groups">Groups</Link>
      </div>
    </div>
  );
};

export default Headers;
