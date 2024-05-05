import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCreateGroup from "../../hooks/useCreateGroup";
const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [isStrict, setIsStrict] = useState(false);
  const [createGroup] = useCreateGroup();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (groupName.length == 0) {
      toast.error("Please fill The name");
      return;
    } else {
      toast.success("okay we got it");
      let obj = {
        nameofthegroup: groupName,
        isstrictGroup: isStrict,
      };

      let flag = createGroup(obj);

      if (flag) {
        toast.success("sucessfully create the group");
      } else {
        toast.error("Something went wrong");
      }

      return;
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="groupName">Group Name:</label>
          <input
            id="groupName"
            name="groupName"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <select onChange={(e) => setIsStrict(e.target.value)}>
            Press true to get superpower:
            <option>true</option>
            <option>false</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GroupForm;
