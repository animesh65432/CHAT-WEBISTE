import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateGroup } from "../../hooks";
import { Button } from "@/components/ui/button"

const GroupForm: React.FC = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [isStrict, setIsStrict] = useState<boolean>(false);
  const [createGroup, errormessage] = useCreateGroup();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (groupName.length === 0) {
      toast.error("Please fill The name");
      return;
    } else {
      let obj = {
        nameofthegroup: groupName,
        isstrictGroup: isStrict,
      };

      let flag = await createGroup(obj);

      if (flag) {
        toast.success("Successfully create the group");
      } else {
        toast.error(errormessage);
      }

      return;
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsStrict(event.target.value === "true");
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label
            htmlFor="groupName"
            className="block text-lg font-medium text-gray-700"
          >
            Group Name:
          </label>
          <input
            id="groupName"
            name="groupName"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <label
            htmlFor="admin"
            className="block text-lg font-medium text-gray-700"
          >
            Press true to get superpower:
          </label>
          <select
            onChange={handleSelectChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            id="admin"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <Button>Create</Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GroupForm;
