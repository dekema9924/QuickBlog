import axios from 'axios';
import { APIURL } from '../config/Url';
import toast from 'react-hot-toast';
import { handleAxiosError } from '../util/handleAxiosError';

export const deleteBlog = (id: string | undefined) => {
    try {
        return axios.delete(`${APIURL.baseUrl}/blogs/${id}`, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message)
            }
        })
    } catch (error) {
        handleAxiosError(error, 'Failed to perform action');

    }
};

export const editBlog = (id: string | undefined, data: any, imageUrl: string,) => {
    try {
        return axios.put(`${APIURL.baseUrl}/blogs/${id}`, { content: data, coverImage: imageUrl }, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message)

            }
        })
    } catch (error) {
        handleAxiosError(error, 'Failed to perform action');


    }
};

export const changePassword = async (new_password: string, confirm_password: string) => {
    try {
        await axios.post(`${APIURL.baseUrl}/auth/changepassword`, { new_password, confirm_password }, { withCredentials: true }).then((result) => {
            console.log(result)
            if (result.status === 200) {
                toast.success(result.data.message)
                window.location.reload()
            }
        })
    } catch (error) {
        handleAxiosError(error, 'Failed to perform action');

    }

}


export const subscribe = async (UserEmail: string) => {
    try {
        await axios.post(`${APIURL.baseUrl}/auth/subscribe`, { UserEmail }, { withCredentials: true }).then((result) => {
            if (result.status === 200) {
                toast.success(result.data.message)
            }
        })
    } catch (error) {
        handleAxiosError(error, 'Failed to perform action');

    }

}

// export const saveBlog = async (id: string) => {
//     try {
//         await axios.post(`${APIURL.baseUrl}/bookmark/addbookmark`, { id }, { withCredentials: true }).then((result) => {
//             if (result.status === 200) {
//                 toast.success(result.data.message)
//             }
//         })
//     } catch (error) {
//         handleAxiosError(error, 'Failed to perform action');

//     }

// }

