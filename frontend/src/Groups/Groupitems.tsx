import { useNavigate } from "react-router-dom";

const Groupitems = ({ name, id }) => {
  const navigate = useNavigate();

  const NavigatetoOneGroups = (id) => {
    navigate(`/GroupOne/:${id}`);
  };
  return (
    <div
      className="border border-gray-200 rounded-md shadow-md p-4 mb-4"
      onClick={() => NavigatetoOneGroups(id)}
    >
      <div className="text-lg font-medium text-gray-800">{name}</div>
    </div>
  );
};

export default Groupitems;
