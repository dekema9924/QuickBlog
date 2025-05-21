import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe';
import Line from '../components/Line';

const BlogDetails = () => {

    const { id } = useParams();
    return (
        <div>
            <Link to={'/'}>
                <span><ArrowBackIcon className='cursor-pointer border rounded-full mx-2' /></span>
                <span className='text-sm'>Back</span>
            </Link>

            {/* //blog details */}
            <section className="mt-14 w-11/12 mx-auto mb-22 flex flex-col items-start">
                <div className="mx-auto max-w-3xl w-full">
                    <p>LifeStyle</p>
                    <h1 className="text-[3em] font-bold my-5">The crossroads of should and must</h1>

                    <p className="gray-text text-sm md:text-lg my-8 flex items-center gap-3">
                        posted by
                        <span className="rounded-full border block w-8">
                            <img
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=400&auto=format&fit=crop&q=60"
                                alt="profilePic"
                            />
                        </span>
                        <span>samantha lane</span> on <span>january 5th 2023</span>
                    </p>

                    <p className="leading-8 text-lg my-5">
                        High in the west the crescent moon hung faint and pale above the smoke of Weybridge and Shepperton and the hot, still splendour of the sunset. "We had better follow this path," I said, "northward." My younger brother was in London when the Martians fell at Woking.
                    </p>
                    <p className="leading-8 text-lg my-5">
                        He was a medical student working for an imminent examination, and he heard nothing of the arrival until Saturday morning. The morning papers on Saturday contained, in addition to lengthy special articles on the planet Mars, on life in the planets, and so forth, a brief and vaguely worded telegram, all the more striking for its brevity. The Martians, alarmed by the approach of a crowd, had killed a number of people with a quick-firing gun.
                    </p>
                </div>
            </section>

            <Line className='my-10 w-11/12 m-auto' />
            <Subscribe />
        </div>
    )
}

export default BlogDetails