import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/Store'
import LogOutButton from '../components/LogOutButton'
import { useRef } from 'react'
import { APIURL } from '../config/Url'
import axios from 'axios'
import { setUser } from '../features/userSlice'
import useGetUser from '../hooks/useGetUser'
import { LoaderIcon } from 'react-hot-toast'

const Profile = () => {
    const user = useSelector((state: RootState) => (state.user.user))
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    console.log(user?.profilePicture)
    const { loading } = useGetUser()





    //upload image to the server
    const HandleImageChange = async () => {
        const file = fileInputRef.current?.files?.[0]


        if (!file) return;


        const formData = new FormData();
        if (file) {
            formData.append('avatar', file);
        }

        try {
            await axios.post(`${APIURL.baseUrl}/auth/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }).then((res) => {
                console.log("Uploaded successfully:", res.data);
                dispatch(setUser({ profilePicture: res.data.message }))
                window.location.reload()

            })

        } catch (err) {
            console.error(err);
        }

    }

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (loading) return <LoaderIcon />

    return (
        <div className="flex flex-col mt-22 md:mt-10 h-[75vh]">
            <h1 className="text-3xl font-bold capitalize">Hello {user?.username} </h1>
            <p className="mt-4 text-lg">This is your profile page.</p>

            <section>
                <div className="flex flex-col items-center mt-8">
                    <div className='flex flex-col items-center gap-3'>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            name='avatar'
                            accept="image/*"
                            onChange={HandleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <button>Upload image</button>

                        {/* Clickable profile image */}
                        <img
                            src={user?.profilePicture || 'https://via.placeholder.com/150'}
                            alt="click to add profile"
                            className="w-32 h-32 rounded-full text-center object-cover border-2 border-gray-700 cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={handleImageClick}
                        />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">{user?.username}</h2>
                    <p className="text-gray-400">{user?.email}</p>
                    <p className="text-gray-400 capitalize">{user?.role}</p>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">User Information</h3>
                    <ul className="mt-4">
                        <li className="flex justify-between capitalize">
                            <p className="font-medium">Username:</p>
                            <p>{user?.username}</p>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-medium">Email:</p>
                            <p>{user?.email}</p>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-medium">Role:</p>
                            <p>{user?.role}</p>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-medium">Created At:</p>
                            <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-medium">Updated At:</p>
                            <p>{user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}</p>
                        </li>
                    </ul>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">Actions</h3>
                    <ul className="mt-4 flex flex-col gap-4">
                        <li className="flex justify-between">
                            <p className="font-medium">Edit Profile:</p>
                            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">
                                Edit
                            </button>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-medium">Change Password:</p>
                            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 cursor-pointer">
                                Change
                            </button>
                        </li>
                        <li className="flex justify-between">
                            <p className="font-medium">Logout:</p>
                            <LogOutButton />
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
export default Profile