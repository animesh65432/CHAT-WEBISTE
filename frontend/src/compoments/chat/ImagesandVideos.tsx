import React, { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../../utils";

interface RootState {
  auth: {
    idtoken: string;
  };
  group: {
    selectedGroups: {
      id: string;
    } | null;
  };
}

const ImagesandVideossend: React.FC = () => {
  const [selectedImageandvideos, setSelectedImageandVideos] =
    useState<File | null>(null);
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const Group = useSelector((state: RootState) => state.group.selectedGroups);

  const handleImageChangeandvideos = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImageandVideos(event.target.files[0]);
    }
  };

  const handleSendImageandvideos_sent = async () => {
    if (!Group || !selectedImageandvideos) {
      toast.error("Group or image/video not selected.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseurl}/message/sendfile`,
        {
          GroupId: Group.id,
          ContentType: selectedImageandvideos.type,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      const url = response?.data?.url;
      const result = await axios.put(url, selectedImageandvideos);
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
