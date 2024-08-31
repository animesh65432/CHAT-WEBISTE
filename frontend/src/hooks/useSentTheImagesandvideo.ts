import { baseurl } from "../utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../reduex";

type sentthefilepayload = {
  id: number;
  selectedFile: File;
};

const useSentTheImagesandvideo = () => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const sentthefile = async (data: sentthefilepayload) => {
    try {
      const response = await axios.post(
        `${baseurl}/message/sendfile`,
        {
          GroupId: data.id,
          ContentType: data.selectedFile.type,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      const url = response?.data?.url;
      if (!url) {
        throw new Error("Failed to retrieve upload URL.");
      }

      const result = await axios.put(url, data.selectedFile, {
        headers: {
          "Content-Type": data.selectedFile.type,
        },
      });

      if (result.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  return [sentthefile];
};

export default useSentTheImagesandvideo;
