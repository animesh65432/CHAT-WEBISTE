import React from "react";
import { MakeAdmin, RemoveUser, Joinusers } from "./index";

interface Props {
  user: any;
}

const GroupActivities: React.FC<Props> = ({ user }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
      <div className="mt-4 space-y-4">
        <Joinusers user={user} />
        <MakeAdmin user={user} />
        <RemoveUser user={user} />
      </div>
    </div>
  );
};

export default GroupActivities;
