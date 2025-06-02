import { useEffect, useState } from 'react'
import Line from '../components/Line';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
// import { useThemeContext } from '../context/ThemeContext';
import Subscribe from '../components/Subscribe';
import About from './About';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { APIURL } from '../config/Url';

export interface BlogDataInterface {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
        username: string;
        profilePicture: string;
        role: string;
        isAdmin: boolean
    };
    tag: string;
    user: string;
    coverImage: string
}


function Blogs() {
    // const { isDarkMode } = useThemeContext();
    const [allblogs, setAllBlogs] = useState<BlogDataInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = allblogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(allblogs.length / blogsPerPage);




    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    useEffect(() => {
        axios.get(`${APIURL.baseUrl}/blogs/getblogs`, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                setAllBlogs(res.data.blogs);
            }
        });
    }, []);

    return (
        <>
            <main className='mt-20'>
                <About />
                {currentBlogs.map((blog: BlogDataInterface) => {
                    return (
                        <div key={blog._id}>
                            <Link to={`/blog/${blog._id}`} className='w-full block m-auto'>

                                <div className='flex gap-4 cursor-pointer items-center'>
                                    <div className='borderBackground flex items-center justify-center w-6 md:h-6 h-4 rounded-full'>
                                        <span className='bg-gray-600 w-2 h-2 rounded-full hover:bg-[#3aa0e4] block'></span>
                                    </div>
                                    <h1 className='text-3xl font-bold my-5 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.title) }} />
                                </div>
                                <p className='gray-text text-xs md:my-1 flex items-center gap-4 md:w-fit'>
                                    posted by
                                    <span className='rounded-full border block w-8'>
                                        <img
                                            className='w-8 rounded-full h-8 object-cover'
                                            src={blog.author.profilePicture}
                                            alt="profilePic"
                                        />
                                    </span>
                                    <span className='capitalize font-bold'>{blog.author.username}</span> on{' '}
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </p>

                                {/* Rendered sanitized HTML content */}
                                <div
                                    className=' overflow-hidden md:w-7/12 text-sm  line-clamp-3 '
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                                />
                            </Link>
                            <Line className='my-14 border-gray-700 border-t-1' />
                        </div>
                    );
                })}
                <div className='flex justify-between items-center w-11/12'>
                    <button
                        onClick={handlePrevPage}
                        className={`flex items-center gap-2 cursor-pointer ${currentPage === 1 ? 'text-gray-500' : ''}`}
                    >
                        <SubdirectoryArrowLeftIcon />
                        <p>Newer Posts</p>
                    </button>
                    <p>
                        {currentPage}/{totalPages}
                    </p>
                    <button
                        onClick={handleNextPage}
                        className={`flex items-center gap-2 cursor-pointer ${currentPage === totalPages ? 'text-gray-500' : ''}`}
                    >
                        <SubdirectoryArrowRightIcon />
                        <p>Older Posts</p>
                    </button>
                </div>
                <Line className='my-14 w-full border-gray-700 border-t-1' />
            </main>
            <Subscribe />
        </>
    );
}

export default Blogs;
