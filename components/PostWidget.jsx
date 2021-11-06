import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getRecentPosts, getSimilliarPosts } from '../services';

const PostWidget = ({ slug, categories }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if (slug) {
            getSimilliarPosts(categories, slug).then(result => {
                setRelatedPosts(result);
            });
        } else {
            getRecentPosts().then(result => {
                setRelatedPosts(result);
            });
        }
    }, [slug]);

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-center'>
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>

            {relatedPosts.map(post => (
                <div className='flex items-center w-full mb-4' key={post.title}>
                    <div className='w-16 flex-none'>
                        <Image
                            src={post.featuredImage.url}
                            alt={post.title}
                            width={60}
                            height={60}
                            className='align-middle rounded-full object-cover'
                        />
                    </div>
                    <div className='flex-grow ml-4'>
                        <p className='text-gray-500 text-xs'>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link
                            href={`/posts/${post.slug}`}
                            className='text-base'
                            key={post.slug}
                        >
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
