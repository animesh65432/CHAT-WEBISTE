import { useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../users/User";
import useGetOnlyParticularOne from "../hooks/useGetOnlyParticularOne";
import useGetTheCurrentUser from "../hooks/useGetTheCurrentUser";
import useGetAllTheUsers from "../hooks/useGetalltheusers";
import GroupsMessage from "../GroupActivites/GroupsMessage";

const GroupOne = () => {
  const { id } = useParams();
  const [fetchData] = useGetOnlyParticularOne();
  const [getCurrentUser] = useGetTheCurrentUser();
  const [fetchUsers] = useGetAllTheUsers();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData(id);
        await getCurrentUser();
        await fetchUsers();
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <div className="flex">
      <div className="w-1/5 p-4">
        <User />
      </div>
      <div className="w-4/5 p-4">
        <GroupsMessage />
      </div>
    </div>
  );
};

export default GroupOne;
