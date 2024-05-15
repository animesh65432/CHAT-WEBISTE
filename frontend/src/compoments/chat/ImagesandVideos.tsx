import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const ImagesandVideossend = () => {
  const [selectedImageandvideos, setSelectedImageandVideos] = useState(null);
  const token = useSelector((state) => state.auth.idtoken);
  const Group = useSelector((state) => state.group.selectedGroups);

  const handleImageChangeandvideos = (event) => {
    setSelectedImageandVideos(event.target.files[0]);
  };

  const handleSendImageandvideos_sent = async () => {
    try {
      let response = await axios.post(
        `http://localhost:3000/message/sendfile`,
        {
          GroupId: Group.id,
          ContentType: "jpg",
        },
        {
          headers: {
            token: token,
          },
        }
      );
      let url = response?.data?.url;
      let result = await axios.put(url, selectedImageandvideos);
      console.log(result);
      toast.success("Image sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send image.");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <input
          type="file"
          onChange={handleImageChangeandvideos}
          className="hidden"
          id="imageInput"
        />
        <label
          htmlFor="imageInput"
          className="bg-blue-500 text-white px-4 py-2 rounded-l-lg cursor-pointer hover:bg-blue-600"
        >
          Choose Image
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg ml-2"
          onClick={handleSendImageandvideos_sent}
        >
          Send
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImagesandVideossend;
