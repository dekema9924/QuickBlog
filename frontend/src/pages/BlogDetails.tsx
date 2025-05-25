import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Subscribe from '../components/Subscribe';
import Line from '../components/Line';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIURL } from '../config/Url';
import type { BlogDataInterface } from './Blogs';
import DOMPurify from 'dompurify';
import { useThemeContext } from '../context/ThemeContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HeadsetIcon from '@mui/icons-material/Headset';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/Store';
import { deleteBlog, editBlog } from '../api/blogActions';
import MyEditor from '../components/MyEditor';

const BlogDetails = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState<BlogDataInterface>();
    const [isLoading, setIsLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const { isDarkMode } = useThemeContext();
    const [showActionBtns, setShowActionBtns] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${APIURL.baseUrl}/blogs/${id}`, { withCredentials: true }).then((res) => {
            setIsLoading(false);
            setBlogData(res.data.message);
        });
    }, [id]);

    useEffect(() => {
        if (blogData && blogData.content && isEdit) {
            setEditedContent(blogData.content);
        }
    }, [blogData, isEdit]);


    if (isLoading) return (
        <Box><CircularProgress /><span className='mx-6'>Loading...</span></Box>
    );

    return (
        <div className='md:w-11/12 m-auto'>
            <Link to={'/'}>
                <span><ArrowBackIcon className='cursor-pointer border rounded-full mx-2' /></span>
                <span className='text-sm'>Back</span>
            </Link>

            <section className="mt-14 md:mt-22 md:w-10/12 m-auto mb-22 flex flex-col items-center">
                <div className="max-w-3xl w-full">
                    <p>LifeStyle</p>
                    <h1
                        className="text-[2.5em] font-bold my-5"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData?.title || '') }}
                    ></h1>

                    <p className={`gray-text capitalize text-sm md:text-lg my-8 flex items-center gap-3 ${isDarkMode !== 'dark' ? "!text-black" : "!text-white"}`}>
                        posted by
                        <span className="rounded-full border block w-8">
                            <img
                                className='w-8 rounded-full h-8 object-cover'
                                src={blogData?.author.profilePicture}
                                alt="profilePic"
                            />
                        </span>
                        <span>{blogData?.author.username}</span> on <span>{new Date(blogData?.createdAt || '').toLocaleDateString()}</span>
                    </p>

                    <div className='border-y-1 h-22 my-5 flex items-center justify-between'>
                        <div className='flex gap-4'>
                            <Box><FavoriteBorderIcon />24</Box>
                            <p className='font-bold'>6min read</p>
                        </div>

                        {
                            user?._id === blogData?.user &&
                            <>
                                <div className='relative'>
                                    <Box onClick={() => setShowActionBtns((prev) => !prev)} sx={{ cursor: 'pointer' }}>
                                        <MoreHorizIcon />
                                    </Box>
                                    <div className={`flex gap-1 flex-col transition-all duration-300 overflow-hidden w-33 right-0 ${showActionBtns ? "h-23 p-2" : "h-0 p-0"} rounded-md justify-center bg-white absolute ${isDarkMode === 'dark' ? "text-black" : "border-gray-700 shadow-xl shadow-gray-700 text-white"}`}>
                                        <Box onClick={() => deleteBlog(blogData?._id)?.then(() => navigate('/'))} sx={{ color: 'red', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                            <DeleteIcon />Delete
                                        </Box>
                                        <Box onClick={() => setIsEdit(!isEdit)} sx={{ cursor: 'pointer', color: '#3aa0e4' }}>
                                            <EditIcon />Edit
                                        </Box>
                                        <Box sx={{ cursor: 'pointer', color: 'black' }}>
                                            <HeadsetIcon />Listen
                                        </Box>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                    {isEdit ? (
                        <div className='my-8'>
                            <MyEditor content={editedContent} onChange={setEditedContent} isEditMode={true}
                            />
                            <div className='flex gap-4 mt-4'>
                                <button
                                    onClick={() => editBlog(blogData?._id, editedContent)?.then(() => window.location.reload())}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className='tiptap'
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogData?.content || '') }}
                        />
                    )}
                </div>
            </section>

            <Line className='my-10 w-11/12 m-auto' />
            <Subscribe />
        </div>
    );
};

export default BlogDetails;
