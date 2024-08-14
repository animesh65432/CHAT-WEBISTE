import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateGroup } from "../../hooks";

interface GroupFormProps {}

const GroupForm: React.FC<GroupFormProps> = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [isStrict, setIsStrict] = useState<boolean>(false);
  const [createGroup] = useCreateGroup();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (groupName.length === 0) {
      toast.error("Please fill The name");
      return;
    } else {
      toast.success("Okay, we got it");
      let obj = {
        nameofthegroup: groupName,
        isstrictGroup: isStrict,
      };

      let flag: any = createGroup(obj);

      if (flag) {
        toast.success("Successfully create the group");
      } else {
        toast.error("Something went wrong");
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GroupForm;
