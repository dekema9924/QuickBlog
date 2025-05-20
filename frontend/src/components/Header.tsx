import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useThemeContext } from '../context/ThemeContext';
import Line from './Line';

const Header = () => {
    const { isDarkMode, toggleDarkMode, isOpen, toggleMenu } = useThemeContext();

    return (
        <header className="h-18 mt-20 flex items-center justify-between p-4  rounded-md">
            {/* //left-side-logo */}
            <div className='borderBackground flex items-center justify-center w-14 h-14 rounded-md'>
                <ElectricBoltIcon className={`${isDarkMode ? "text-white" : ""}`} sx={{ fontSize: 30 }} />
            </div>

            {/* //right-side-logo */}
            <div className='gray-text flex items-center gap-6 relative '>
                <SearchIcon className='hover:text-white' sx={{ fontSize: 30, cursor: 'pointer', }} />
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
                <nav className={` absolute ${isDarkMode == 'light' ? "lightmode shadow-2xl " : "borderBackground"} top-15 right-0 w-66 text-white rounded-md transform origin-top transition-all duration-500 ease-in-out ${isOpen ? "scale-y-100 opacity-100 py-7" : "scale-y-0 opacity-0 py-0 pointer-events-none"
                    }`}>
                    <ul className="flex items-end mr-6 gap-6 flex-col">
                        <li>Home</li>
                        <li>MemberPost</li>
                        <li>Membership</li>
                        <li>Standard Post</li>
                        <li>Members Post</li>
                        <Line className='my-2 w-11/12' />
                        <li>Subscribe</li>
                        <li>Sign In</li>
                    </ul>
                </nav>



            </div>

        </header>
    )
}



export default Header;