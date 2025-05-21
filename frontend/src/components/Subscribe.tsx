import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useThemeContext } from '../context/ThemeContext';

const Subscribe = () => {
    const { isDarkMode } = useThemeContext();

    return (
        <div className=" w-full flex flex-col gap-6 h-96 items-center py-6">

            <h2 className="text-3xl font-bold text-center">Subscribe to QuickBlogs</h2>
            <p className=" text-center w-10/12 md:w-7/12 leading-7">Subscribe to our newsletter and receive access to exclusive posts and content updates. We don't spam and your email won't be shared with third-parties.</p>

            <form className='flex items-center m-auto relative md:w-5/12 w-76'>
                <input className={`${isDarkMode === 'dark' ? "borderBackground" : "bg-white border"} w-full  h-15 outline-none rounded-md pl-4`} type="email" placeholder="Enter your email" required />
                <button type="submit" className="blue-text cursor-pointer border text-center flex items-center justify-center  rounded-full h-6 w-6 absolute right-4">
                    <ArrowForwardIcon sx={{ fontSize: 15 }} />
                </button>
            </form>
        </div>
    )
}

export default Subscribe;