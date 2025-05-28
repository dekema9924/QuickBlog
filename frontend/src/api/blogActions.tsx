import axios, { AxiosError } from 'axios';
import { APIURL } from '../config/Url';
import toast from 'react-hot-toast';


export const deleteBlog = (id: string | undefined) => {
    try {
        return axios.delete(`${APIURL.baseUrl}/blogs/${id}`, { withCredentials: true }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message)
            }
        })
    } catch (error: any) {
        if (error.response?.data) {
            // Assuming your server sends { message: "..." }
            const message = (error.response.data as { message: string }).message;
            console.log({ message: message })
            toast.error(message);
        } else {
            toast.error("Something went wrong.");
        }
    }
};

export const editBlog = (id: string | undefined, data: any, imageUrl: string,) => {
    try {
        console.log(imageUrl)
        return axios.put(`${APIURL.baseUrl}/blogs/${id}`, { content: data, coverImage: imageUrl }, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message)

            }
        })
    } catch (error) {
        if (error) {
            toast.error('failed to delete')
            return
        }

    }
};
