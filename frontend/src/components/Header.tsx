import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useThemeContext } from '../context/ThemeContext';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Line from './Line';
import { useState } from 'react';
import { useModalContext } from '../context/ModalContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/Store';
import { selectUserRole } from '../features/userSlice';
import LogOutButton from './LogOutButton';



const Header = () => {
    const { isDarkMode, toggleDarkMode, isOpen, toggleMenu, setIsOpen } = useThemeContext();
    const [isVisible, setIsVisible] = useState(false);
    const { isModalOpen, setIsModalOpen } = useModalContext();
    const userRole = useSelector(selectUserRole);
    const user = useSelector((state: RootState) => state.user.user);
    const isMember = userRole === 'member' || userRole === 'admin';


    const handleMenu = () => {
        setIsOpen(false);
    }

    return (
        <header className="h-18 md:mt-20 mt-12 flex items-center justify-between p-4  rounded-md">
            {/* //left-side-logo */}
            <div className='borderBackground flex items-center justify-center w-14 h-14 rounded-md'>
                <ElectricBoltIcon className={`${isDarkMode ? "text-white" : ""}`} sx={{ fontSize: 30 }} />
            </div>

            {/* //right-side */}
            <div className='gray-text flex items-center gap-4 relative '>

                {/* //add new post */}
                <div onClick={() => setIsModalOpen(true)} onMouseOut={() => setIsVisible(false)} onMouseOver={() => setIsVisible(true)} className={`relative ${isMember ? "block" : "hidden"} ${isModalOpen ? "hidden" : ""}  `}>
                    <span className='cursor-pointer '><PostAddIcon sx={{ fontSize: 28 }} /></span>
                    <p className={`text-sm border ${isDarkMode === 'light' ? "bg-black text-white" : "bg-white text-black "} text-center ${isVisible ? "opacity-80" : "opacity-0"} rounded-md absolute w-17 right-0 top-5`}>Add Post</p>
                </div>

                {
                    isDarkMode === 'light' ? (
                        <WbSunnyIcon className='hover:text-white' sx={{ fontSize: 30, cursor: 'pointer', }} onClick={toggleDarkMode} />
                    ) : (
                        <BedtimeIcon className='hover:text-white' sx={{ fontSize: 30, cursor: 'pointer', }} onClick={toggleDarkMode} />
                    )
                }

                {/* //hamburger menu */}
                <div onClick={toggleMenu} className='w-12 h-12 flex flex-col items-center justify-center gap-2 cursor-pointer'>
                    <span className={`border-t-2 !border-gray-400 block w-9/12 transition-all duration-300 ${isOpen ? "delay-600 translate-y-2 rotate-45" : "translate-y-1"}`}></span>
                    <span className={`border-t-2 !border-gray-400 block w-9/12 transition-all duration-300 ${isOpen ? "hidden" : "my-1"}`}></span>
                    <span className={`border-t-2 !border-gray-400 block w-9/12 transition-all duration-300 ${isOpen ? "delay-600 -rotate-45" : "-translate-y-1"}`}></span>
                </div>

                {/* Nav */}
                <nav className={` absolute z-50 ${isDarkMode == 'light' ? "lightmode shadow-2xl " : "borderBackground"} top-15 right-0 w-66 text-white rounded-md transform origin-top transition-all duration-500 ease-in-out ${isOpen ? "scale-y-100 opacity-100 py-7" : "scale-y-0 opacity-0 py-0 pointer-events-none"
                    }`}>
                    <ul className="flex items-end mr-6 gap-6 flex-col">
                        <Link onClick={() => handleMenu()} to={'/'}>Home</Link>
                        <Link onClick={() => handleMenu()} to={'/membership'}>Membership</Link>
                        <Link onClick={() => handleMenu()} to={'/standardposts'}>Standard Post</Link>
                        <Link onClick={() => handleMenu()} to={'/memberspost'}>Members Post</Link>
                        <Line className='my-2 w-11/12' />
                        {
                            user?._id && (
                                <>
                                    <Link onClick={() => handleMenu()} to={'/my-posts'}>My Posts</Link>
                                    <Link onClick={() => handleMenu()} to={'/profile'}>My Profile</Link>
                                    <LogOutButton />

                                </>
                            )
                        }
                        {
                            !user?._id && (
                                <>
                                    <Link onClick={() => handleMenu()} to={'/signup'}>Sign Up</Link>
                                    <Link onClick={() => handleMenu()} to={'/signin'}>Sign In</Link>
                                </>
                            )
                        }
                    </ul>
                </nav>



            </div>

        </header>
    )
}



export default Header;