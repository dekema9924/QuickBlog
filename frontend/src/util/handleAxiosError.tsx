// utils/handleAxiosError.ts
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';


export function handleAxiosError(error: unknown, fallbackMessage = 'Something went wrong') {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage = axiosError?.response?.data?.message || fallbackMessage;
    toast.error(errorMessage)
}
