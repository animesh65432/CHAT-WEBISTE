import { useEffect, useState } from "react";
import useGroups from "../hooks/useGroups";
import Groupitems from "./Groupitems";
import GroupBottomFrom from "./GruopsFrom/GroupBottomFrom";
import { useSelector } from "react-redux";

const Groups = () => {
  const [fetchData] = useGroups();
  const groups = useSelector((state) => state.group.value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAsync();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 text-lg mb-4">
          We don't have any groups right now.
        </p>
        <GroupBottomFrom />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {groups.map((group, index) => (
        <Groupitems key={index} name={group.nameofthegroup} id={group.id} />
      ))}
      <GroupBottomFrom />
    </div>
  );
};

export default Groups;
