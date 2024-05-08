import JoinUsers from "./Joinusers";
import MakeAdmin from "./MakeAdmin";
import RemoveUser from "./RemoveUser";

const GroupActivities = ({ user }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
      <div className="mt-4 space-y-4">
        <JoinUsers user={user} />
        <MakeAdmin user={user} />
        <RemoveUser user={user} />
      </div>
    </div>
  );
};

export default GroupActivities;
