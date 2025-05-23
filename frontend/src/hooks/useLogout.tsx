import axios from "axios"
import { APIURL } from "../config/Url"
import { useDispatch } from "react-redux"
import { clearUser } from "../features/userSlice"
import toast from "react-hot-toast"

const useLogOut = () => {
    const dispatch = useDispatch()

    const logOut = async () => {
        try {
            await axios.post(`${APIURL.baseUrl}/auth/signout`, {}, { withCredentials: true }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    toast.success(res.data.message)
                    dispatch(clearUser())
                    window.location.href = "/"

                }

            })

        } catch (error) {
            console.error("Logout error:", error)
            toast.error("Logout failed")
        }
    }

    return (
        logOut
    )

}

export default useLogOut