import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon } from '@heroicons/react/outline';

const PostCard = ({ post }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden mb-6'>
                <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    width={1200}
                    height={800}
                    className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </div>

            <h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-blue-600 text-3xl font-semibold '>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h1>

            <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
                <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                    <Image
                        src={post.author.photo.url}
                        alt={post.author.name}
                        height={30}
                        width={30}
                        className='align-middle rounded-full'
                    />
                    <p className='inline align-middle text-gray-700 ml-2 text-lg'>
                        {post.author.name}
                    </p>
                </div>

                <div className='font-medium text-gray-700 flex justify-center items-center'>
                    <CalendarIcon className='h-7 w-7 text-red-500 mr-2' />
                    <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                </div>
            </div>

            <p className='text-center text-lg text-gray-700 font-normal px-4 lg:py-16 mb-8'>
                {post.excerpt}
            </p>

            <div className='text-center'>
                <Link href={`/post/${post.slug}`}>
                    <span className='cursor-pointer transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-3 '>
                        Continue Reading...
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
