import { useEffect, useState } from "react";
import { useGroups, useCheckisAdmin } from "../hooks";
import { Groupitems, GroupBottomFrom } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../reduex";
import React from "react";

const Groups: React.FC = () => {
  const [fetchData] = useGroups();
  const selectedgroups = useSelector(
    (state: RootState) => state.group.selectedGroups
  );
  const groups = useSelector((state: any) => state.group.GroupArray);
  const [fetchdata] = useCheckisAdmin();
  const [loading, setLoading] = useState(true);

  console.log(groups);
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
    <div className="md:h-full mx-auto  bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-4">Groups</h2>
        <GroupBottomFrom />
      </div>
      <div className="flex md:flex-col md:h-dvh md:overflow-y-scroll overflow-x-scroll">
        {groups.map((group: any, index: any) => (
          <Groupitems key={index} obj={group} />
        ))}
      </div>

    </div>
  );
};

export default Groups;
