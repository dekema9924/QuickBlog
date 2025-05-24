
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

function Alert() {
    const { isDarkMode } = useThemeContext()
    return (
        <div className="flex justify-center items-center h-[66vh] mt-10">
            <div className="w-full max-w-md p-6 bg-red-50 border border-red-200 rounded-lg shadow-lg text-center">
                <div className="flex flex-col items-center gap-4">
                    <AnnouncementIcon sx={{ fontSize: 50, color: '#ef4444' }} />
                    <h2 className="text-red-600 font-semibold text-xl">Access Denied</h2>
                    <p className="text-red-500 text-sm">
                        This page is for <strong>members only</strong>. Please sign in or upgrade your account to continue.<br />
                        <Link className={`w-24 block m-auto ${isDarkMode !== 'light' ? "bg-black text-white" : "bg-white text-black"} my-2 h-8 rounded-md  flex justify-center items-center cursor-pointer`} to={'/signin'}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Alert;
