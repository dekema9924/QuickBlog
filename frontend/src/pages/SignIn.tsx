
import { useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useThemeContext } from '../context/ThemeContext';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { APIURL } from '../config/Url';
import { useNavigate } from 'react-router-dom';




function SignIn() {
    const navigate = useNavigate()
    const [isPasswordVisible, setIsPasswordVisible] = useState("password")
    const { isDarkMode } = useThemeContext()
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",

    })

    //handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const email = inputValue.email
        const password = inputValue.password
        e.preventDefault()

        //check if email and password are valid
        if (!email) {
            toast.error("Please enter a valid email")
            return
        }
        if (!password) {
            toast.error("Please enter a strong password")
            return
        }

        axios.post(`${APIURL.baseUrl}/auth/signin`, {
            email: inputValue.email,
            password: inputValue.password
        }, {
            withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message)
                navigate("/")
                window.location.reload()

            }
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

    }

    //google sign in
    const handleGoogleSignIn = () => {
        const newWindow = window.open("http://localhost:3000/auth/google", "_self");
        if (!newWindow) {
            toast.error("Failed to open the authentication window.");
        }
    }


    return (
        <>
            <div className='flex flex-col gap-5 items-center justify-center md:h-[75vh] h-[90vh]  border border-gray-500 rounded-md shadow-gray-600 shadow-md p-5'>
                <div className='mt-10 '>
                    <h1 className='md:text-[3em] text-[1.9em] text-center font-bold'>Welcome Back !</h1>
                    <p className={` text-center md:w-96 m-auto ${isDarkMode === 'light' ? "text-gray-700" : "gray-text"} my-4`}>Read from over a hundred blog post with new additions published every week.</p>
                </div>

                {/* //user login form */}
                <div className='flex flex-col md:flex-row md:gap-10 items-center justify-center'>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="email" className='text-gray-500 ml-4 md:ml-0'>Email</label>
                            <div className='relative flex items-center justify-center'>
                                <input onChange={(e) => handleInputChange(e)} type="email" name="email" id="email" className={`border border-gray-300 outline-none rounded-md p-2  md:w-80 w-full flex flex-col mt-2 ${isDarkMode === 'light' ? "bg-gray-100" : ""}`} />
                                <MailIcon className='absolute right-4' />

                            </div>
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="password" className='text-gray-500 ml-4 md:ml-0'>Password</label>
                            <div className='relative flex items-center justify-center'>
                                <input onChange={(e) => handleInputChange(e)} type={isPasswordVisible} name="password" id="password" className={`border border-gray-300 outline-none rounded-md p-2  md:w-80 w-full flex flex-col mt-2 ${isDarkMode === 'light' ? "bg-gray-100" : ""}`} />
                                {
                                    isPasswordVisible === "text" ?
                                        <LockOpenIcon className='absolute cursor-pointer right-4' onClick={() => setIsPasswordVisible("password")} />
                                        :
                                        <LockOutlineIcon className='absolute cursor-pointer right-4' onClick={() => setIsPasswordVisible("text")} />
                                }
                            </div>
                        </div>
                        <div className='m-auto flex items-center justify-center'>
                            <button className={`border w-66 justify-center cursor-pointer  my-6 h-9 rounded-md ${isDarkMode === 'light' ? "bg-black text-white" : "bg-white text-black"} flex items-center gap-1`}>SignIn<ArrowForwardIcon sx={{ fontSize: 15 }} /> </button>
                        </div>
                        <p className='text-center'>No account? <Link className='blue-text' to={'/signup'}>Create One</Link></p>
                    </form>
                    <p className='font-bold text-4xl'>/</p>

                    {/* //oAuth login */}
                    <div>
                        <button onClick={handleGoogleSignIn} className={`border w-66 justify-center cursor-pointer  my-2 h-9 rounded-md ${isDarkMode === 'light' ? "bg-black text-white" : "bg-white text-black"} flex items-center gap-1`}>
                            <GoogleIcon sx={{ fontSize: 20 }} /> Continue with Google
                        </button>


                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn