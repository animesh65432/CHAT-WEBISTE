import React, { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/reduex";
import { useSocket } from "@/Socket/SocketProvider";
import axios from "axios";

const ImagesandVideossend: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const group = useSelector((state: RootState) => state.group.selectedGroups);
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const { connecttosocket, socket } = useSocket();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setSelectedFile(file);
      } else {
        toast.error("Please select a valid image or video file.");
      }
    }
  };

  const handleSendFile = async () => {
    if (!group || !selectedFile) {
      toast.error("Group or file not selected.");
      return;
    }

    try {
      connecttosocket();
      if (!socket) return;
      socket.emit("UploadWithMessage", {
        GroupId: group.id,
        token,
        ContentType: selectedFile.type,
      });

      socket.on("UploadUrl", async ({ url }: { url: string }) => {
        try {
          await axios.put(url, selectedFile, {
            headers: {
              "Content-Type": selectedFile.type,
            },
          });
          toast.success("Sucessfully upload the photo");
        } catch (error) {
          toast.error("Failed to upload file. Please try again.");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send file. Please try again.");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
          accept="image/*,video/*"
        />
        <label
          htmlFor="fileInput"
          className="bg-blue-500 text-white px-4 py-2 rounded-l-lg cursor-pointer hover:bg-blue-600"
        >
          Choose File
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg ml-2"
          onClick={handleSendFile}
        >
          Send
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImagesandVideossend;
