import { useEffect, useState } from "react";
import useGroups from "../hooks/useGroups";
import Groupitems from "./Groupitems";
import GroupBottomFrom from "./GruopsFrom/GroupBottomFrom";
import { useSelector } from "react-redux";
import useCheckisAdmin from "../hooks/groups/useCheckisAdmin";

const Groups = () => {
  const [fetchData] = useGroups();
  const selectedgroups = useSelector((state) => state.group.selectedGroups);
  const groups = useSelector((state) => state.group.value);
  const [fetchdata] = useCheckisAdmin();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData();
        await fetchdata();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAsync();
  }, [selectedgroups]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (groups.length == 0) {
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
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group, index) => (
          <Groupitems key={index} obj={group} />
        ))}
      </div>
      <GroupBottomFrom />
    </div>
  );
};

export default Groups;
