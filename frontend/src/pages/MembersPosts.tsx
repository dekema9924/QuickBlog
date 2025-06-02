
import { useSelector } from 'react-redux'
import Alert from '../components/Alert'
import { selectUserRole } from '../features/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { APIURL } from '../config/Url'
import Line from '../components/Line'
import axios from 'axios'
import type { BlogDataInterface } from './Blogs'
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { LoaderIcon } from 'react-hot-toast'
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import { saveBlog } from '../api/blogActions'


function MembersPosts() {
    const userRole = useSelector(selectUserRole)
    const [membersBlogs, setMemberBlogs] = useState<BlogDataInterface[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = membersBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(membersBlogs.length / blogsPerPage);
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    // const [isHiddenPremuimIndex, setHiddenPremuimIndex] = useState<number | null>(null)



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

    // const handleisPremuimTextHidden = (index: number) => {
    //     setHiddenPremuimIndex(index)
    //     if (isHiddenPremuimIndex === index) {
    //         setHiddenPremuimIndex(null)

    //     }
    //     setHiddenPremuimIndex(index)
    //     setTimeout(() => {
    //         setHiddenPremuimIndex(null)
    //     }, 600)
    // }



    useEffect(() => {
        axios.get(`${APIURL.baseUrl}/blogs/membersblogs`, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                setMemberBlogs(res.data.blogs);
                setloading(false)
            }
            console.log(loading)
        });
    }, []);


    if (userRole === 'standard') {
        return <Alert />
    }


    if (loading) return <LoaderIcon />

    console.log({ blogs: membersBlogs })

    return (

        <>

            <main className='mt-20'>
                {currentBlogs.map((blog: BlogDataInterface) => {
                    return (
                        <div key={blog._id}>
                            <div className='w-full block m-auto'>

                                <div className='flex gap-4 cursor-pointer items-center'>
                                    <div className='borderBackground flex items-center justify-center w-6 md:h-6 h-4 rounded-full'>
                                        <span className='bg-gray-600 w-2 h-2 rounded-full hover:bg-[#3aa0e4] block'></span>
                                    </div>
                                    <h1 className='text-3xl font-bold my-5 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.title) }} />
                                </div>
                                <div className='gray-text text-xs md:my-1 flex items-center gap-4 md:w-fit'>
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


                                    {/* //bookmark post */}
                                    {/* <div onMouseOver={() => handleisPremuimTextHidden(index)} onMouseOut={() => handleisPremuimTextHidden(index)} className={`text-green-300 cursor-pointer flex border gap-1 items-center`}>
                                        <p className={`${isHiddenPremuimIndex !== index ? "hidden" : "block "}`}>Premium</p>
                                        <BookmarkBorderIcon />
                                    </div> */}
                                </div>

                                {/* Rendered sanitized HTML content */}
                                <div
                                    className=' overflow-hidden md:w-7/12 text-sm  line-clamp-3 '
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                                />
                            </div>

                            <button
                                onClick={() => navigate(`/blog/${blog._id}`)} className='mt-4 text-sm h-8 rounded border px-4 cursor-pointer'>Read more</button>
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
        </>
    )
}

export default MembersPosts