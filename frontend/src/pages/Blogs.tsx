import { useState } from 'react'
import BlogsData from '../helper/BlogData';
import Line from '../components/Line';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useThemeContext } from '../context/ThemeContext';
import Subscribe from '../components/Subscribe';
import About from './About';
import { Link } from 'react-router-dom';

export interface BlogDataInterface {
    id: number;
    title: string;
    content: string;
    date: string;
    author: string;
    category: string;
}

function Blogs() {
    const { isDarkMode } = useThemeContext();
    const [allblogs, setAllBlogs] = useState<BlogDataInterface[]>(BlogsData)
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(3);
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



    return (
        <>
            <main className='mt-20 '>
                <About />
                {
                    currentBlogs.map((blog: BlogDataInterface) => {
                        return (
                            <>
                                <Link to={`/blog/${blog.id}`} key={blog.id} className='w-full block  m-auto'>
                                    <h3 className={`gray-text text-xl md:mb-10 cursor-pointer ${isDarkMode === 'dark' ? "hover:!text-gray-300" : "hover:!text-gray-900"}`}>{blog.category}</h3>
                                    <div className='flex gap-4 cursor-pointer items-center'>
                                        <div className='borderBackground flex items-center justify-center w-6 md:h-6 h-4 rounded-full'>
                                            <span className=' bg-gray-600 w-2 h-2 rounded-full hover:bg-[#3aa0e4] block'></span>
                                        </div>
                                        <h1 className='text-3xl font-bold my-5'>{blog.title}</h1>
                                    </div>
                                    <p className='gray-text text-xs my-8 flex items-center gap-4 md:w-fit'>posted by <span className='rounded-full border block w-8'><img className='w-8 rounded-full h-8 object-cover' src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="profilePic" /></span> <span>{blog.author}</span> on <span>{blog.date}</span></p>
                                    <p className="md:w-8/12 overflow-hidden text-ellipsis line-clamp-3">
                                        {blog.content}
                                    </p>


                                </Link>
                                <Line className='my-14 border-gray-700 border-t-1' />
                            </>

                        )
                    })
                }
                {/* <Line className='my-14 w-full border-gray-700 border-t-1' /> */}

                <div className='flex justify-between items-center w-11/12'>
                    <button onClick={handlePrevPage} className={`flex items-center gap-2 cursor-pointer ${currentPage === 1 ? 'text-gray-500' : ''}`}>
                        <SubdirectoryArrowLeftIcon />
                        <p>Newer Posts</p>
                    </button>
                    <p>{currentPage}/{totalPages}</p>
                    <button onClick={handleNextPage} className={`flex items-center gap-2 cursor-pointer ${currentPage === totalPages ? 'text-gray-500' : ''}`}>
                        <SubdirectoryArrowRightIcon />
                        <p>Older Posts</p>
                    </button>
                </div>
                <Line className='my-14 w-full border-gray-700 border-t-1' />
            </main>
            <Subscribe />
        </>
    )
}

export default Blogs