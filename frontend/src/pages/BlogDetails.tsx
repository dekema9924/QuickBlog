import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import '../styles/MyEditor.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Subscribe from '../components/Subscribe'
import Line from '../components/Line'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { APIURL } from '../config/Url'
import type { BlogDataInterface } from './Blogs'
import DOMPurify from 'dompurify'
import { useThemeContext } from '../context/ThemeContext'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HeadsetIcon from '@mui/icons-material/Headset'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/Store'
import { deleteBlog, editBlog } from '../api/blogActions'
import MyEditor from '../components/MyEditor'
import { useModalContext } from '../context/ModalContext'
import toast from 'react-hot-toast'

const BlogDetails = () => {
    const { id } = useParams()
    const [blogData, setBlogData] = useState<BlogDataInterface>()
    const [isLoading, setIsLoading] = useState(true)
    const [editedContent, setEditedContent] = useState('')
    const { setIsEditModalOpen, isEditModalOpen } = useModalContext()
    const { isDarkMode } = useThemeContext()
    const [showActionBtns, setShowActionBtns] = useState(false)
    const user = useSelector((state: RootState) => state.user.user)
    const navigate = useNavigate()
    const readTime = blogData ? `${Math.ceil(blogData.content.length / 800)} min read` : ''
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null)


    useEffect(() => {
        axios.get(`${APIURL.baseUrl}/blogs/${id}`, { withCredentials: true }).then((res) => {
            setIsLoading(false)
            setBlogData(res.data.message)
        })
    }, [id])

    useEffect(() => {
        if (blogData && blogData.content && isEditModalOpen) {
            setEditedContent(blogData.content)
        }
    }, [blogData, isEditModalOpen])

    if (isLoading) {
        return (
            <Box>
                <CircularProgress />
                <span className='ml-4'>Loading...</span>
            </Box>
        )
    }


    //save new coverImage
    const handleEditSave = async () => {
        let imageUrl = blogData?.coverImage || ''
        console.log('submitting edit')

        if (coverImageFile) {
            const formData = new FormData()
            formData.append('file', coverImageFile)
            formData.append('upload_preset', 'blog_uploads')

            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dzhawgjow/image/upload',
                formData
            )
            imageUrl = uploadRes.data.secure_url
        }

        if (blogData?._id && editedContent) {
            await editBlog(blogData._id, editedContent, imageUrl)
            toast.success("Blog updated")
            setIsEditModalOpen(false)
            window.location.reload()
        } else {
            toast.error("Missing required fields.")
        }
    }


    return (
        <>
            {/* Main content */}
            <div className={`md:w-11/12 mx-auto ${isEditModalOpen ? 'opacity-20 pointer-events-none' : ''}`}>
                <Link to='/' className='flex items-center gap-2 mt-4'>
                    <ArrowBackIcon className='cursor-pointer border rounded-full' />
                    <span className='text-sm'>Back</span>
                </Link>

                <section className='mt-14 md:mt-20 md:w-10/12 mx-auto mb-20 flex flex-col items-center'>

                    <div className='max-w-3xl w-full'>
                        {/* <p className='uppercase text-xs text-gray-500'>Lifestyle</p> */}


                        <h1
                            className='text-3xl md:text-4xl font-bold  leading-tight capitalize '
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData?.title || '') }}
                        />
                        <p
                            className={`text-sm  my-6 flex items-center gap-3 ${isDarkMode !== 'dark' ? '!text-black' : '!text-white'
                                }`}
                        >
                            Posted by
                            <span className='rounded-full border w-8 h-8 overflow-hidden'>
                                <img
                                    className='w-8 h-8 rounded-full object-cover'
                                    src={blogData?.author.profilePicture}
                                    alt='profile'
                                />
                            </span>
                            <span className={`capitalize font-bold ${isDarkMode == 'dark' ? "!text-white" : "!text-black"}`}>{blogData?.author.username}</span> on{' '}
                            <span className={`capitalize font-bold ${isDarkMode == 'dark' ? "!text-gray-400" : "!text-gray-700"}`}>{new Date(blogData?.createdAt || '').toLocaleDateString()}</span>
                        </p>



                        <div className='flex justify-between items-center border-t border-b  py-2'>
                            <div className='flex gap-4 items-center text-sm'>
                                <Box><FavoriteBorderIcon /></Box>
                                <p className='font-semibold'>{readTime}</p>
                            </div>

                            {user?._id === blogData?.user && (
                                <div className='relative'>
                                    <Box onClick={() => setShowActionBtns((prev) => !prev)} sx={{ cursor: 'pointer' }}>
                                        <MoreHorizIcon />
                                    </Box>
                                    <div
                                        className={`absolute right-0 mt-2 bg-white dark:bg-[#1e1e1e] rounded-md shadow-lg overflow-hidden z-20 transition-all duration-300 ${showActionBtns ? 'h-auto p-2' : 'h-0 p-0'
                                            }`}
                                    >
                                        <button
                                            onClick={() => deleteBlog(blogData?._id)?.then(() => navigate('/'))}
                                            className='flex items-center gap-2 text-red-600 hover:underline'
                                        >
                                            <DeleteIcon /> Delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(true)
                                                setShowActionBtns(false)
                                            }}
                                            className='flex items-center gap-2 text-blue-500 hover:underline mt-2'
                                        >
                                            <EditIcon /> Edit
                                        </button>
                                        <button
                                            onClick={() => setShowActionBtns(false)}
                                            className='flex items-center gap-2 text-gray-600 hover:underline mt-2'
                                        >
                                            <HeadsetIcon /> Listen
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* //bg-img */}

                        <div >
                            {
                                blogData?.coverImage ? <img className='mt-14 w-full rounded-md' src={blogData.coverImage} alt="" /> : ""
                            }
                        </div>
                    </div>

                </section>


            </div>

            {/* Blog Content */}
            {!isEditModalOpen && (
                <div
                    className='tiptap max-w-3xl mx-auto mb-10 px-4'
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData?.content || '') }}
                />
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setIsEditModalOpen(false)}
                    />

                    {/* Modal at bottom */}

                    <div
                        className={`fixed bottom-0 left-0 right-0 z-50 md:w-full w-full max-w-7xl mx-auto rounded-t-lg shadow-lg
        ${isDarkMode === 'dark' ? 'bg-black' : 'bg-white'}
        flex flex-col md:max-w-90vw max-h-[90vh]`}
                    >
                        {/* Scrollable editor area */}
                        <div className="p-6 overflow-y-auto flex-1 min-h-[700px]">
                            <MyEditor
                                content={editedContent}
                                onChange={setEditedContent}
                                setCoverImageFile={setCoverImageFile}
                                isEditMode={true}
                            />
                        </div>

                        {/* Sticky footer buttons */}
                        <div className={` p-4 flex justify-end gap-4 sticky bottom-0  bg-white ${isDarkMode == 'dark' ? "!bg-black" : "!bg-white"}`}>
                            <button
                                onClick={handleEditSave}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}


            <Line className='my-10 w-11/12 mx-auto' />
            <Subscribe />
        </>
    )
}

export default BlogDetails

