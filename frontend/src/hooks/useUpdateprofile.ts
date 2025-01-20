import axios from "axios";
import { useState } from "react";
import { baseurl } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/reduex"
import { setthecurrentuser } from "@/reduex/users"

type DataPayload = {
    image: string;
    name: string;
    email: string;
};

type UseUpdateProfileReturnTypes = [
    loading: boolean,
    updateProfile: (data: DataPayload) => Promise<void>
];

const useUpdateProfile = (): UseUpdateProfileReturnTypes => {
    const [loading, setLoading] = useState<boolean>(false);
    const token = useSelector((state: RootState) => state.auth.idtoken)
    const dispacth = useDispatch()

    const updateProfile = async (data: DataPayload) => {
        setLoading(true);
        try {
            const response = await axios.put(`${baseurl}/users/update`, data, {
                headers: {
                    token
                }
            });
            const user = response.data.user
            dispacth(setthecurrentuser(user))
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return [loading, updateProfile];
};

export default useUpdateProfile;
