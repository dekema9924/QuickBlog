import { useThemeContext } from "../context/ThemeContext"
import { changePassword } from "../api/blogActions"
import { useState } from "react"
import validate from 'validator'
import toast from "react-hot-toast"

const Password = (props: { setPasswordBoxOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { isDarkMode } = useThemeContext()

    const [isInput, setInput] = useState({
        new_password: "",
        confirm_password: ""
    })

    const validatePswrd = validate.isStrongPassword(isInput.confirm_password && isInput.new_password)



    const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isInput.confirm_password.length === 0 || isInput.new_password.length === 0) return toast.error('input field empty')
        if (!validatePswrd) return toast.error('password not strong enough')
        changePassword(isInput.confirm_password, isInput.new_password)
    };




    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <form onSubmit={(e) => handleSubmit(e)} className={`border absolute z-50 left-0  right-0 w-96 m-auto  h-96 rounded-md ${isDarkMode === 'dark' ? "bg-black  border-gray-700 text-white" : "bg-white text-black shadow-2xl shadow-gray-500"}`} action="">

                <p onClick={() => props.setPasswordBoxOpen(false)} className=" text-end pr-6 mt-4 cursor-pointer text-red-400 text-2xl">X</p>

                <div>
                    <div className="w-full flex flex-col gap-5 items-center justify-center h-10/12">
                        <div className=" flex flex-col pl-4 ">
                            <label htmlFor="new_password">New_password</label>
                            <input onChange={(e) => handleInputChage(e)} className="border w-10/12 rounded-md mt-1 h-9 outline-none pl-4" type="password" name="new_password" />
                        </div>

                        <div className=" flex flex-col pl-4">
                            <label htmlFor="new_password">Confirm_password</label>
                            <input onChange={(e) => handleInputChage(e)} className="border w-10/12 rounded-md mt-1 h-9 outline-none pl-4" type="password" name="confirm_password" />
                        </div>
                    </div>

                    <button className="border-2 my-6 w-44 m-auto rounded-md h-9 cursor-pointer flex items-center font-bold justify-center">Submit </button>

                </div>
            </form >
        </>
    )
}

export default Password