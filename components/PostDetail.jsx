import { CalendarIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { CodeBlock, dracula } from 'react-code-blocks';

const PostDetail = ({ post }) => {
    return (
        <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden  mb-6'>
                <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    width={1200}
                    height={800}
                    className='object-top shadow-md h-full w-full rounded-t object-cover'
                />
            </div>

            <div className='px-4 lg:px-0'>
                <div className='flex items-center mb-8 w-full'>
                    <div className='flex items-center  mb-4 lg:mb-0 w-6/12 lg:w-auto mr-8'>
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

                    <div className='font-medium text-gray-700 flex items-center'>
                        <CalendarIcon className='h-7 w-7 text-red-500 mr-2' />
                        <span>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </span>
                    </div>
                </div>

                <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>

                <RichText
                    content={post.content.raw.children}
                    renderers={{
                        h1: ({ children }) => (
                            <h1 className='text-3xl font-semibold mb-4'>
                                {children}
                            </h1>
                        ),
                        h3: ({ children }) => (
                            <h3 className='text-xl font-semibold mb-4'>
                                {children}
                            </h3>
                        ),
                        p: ({ children }) => <p className='mb-8'>{children}</p>,
                        h4: ({ children }) => (
                            <h4 className='text-md font-semibold mb-4'>
                                {children}
                            </h4>
                        ),
                        img: ({ src, width, height, altText, title }) => (
                            <Image
                                alt={altText}
                                height={height}
                                width={width}
                                src={src}
                                title={title}
                            />
                        ),
                        code_block: ({ children }) => {
                            const text = children.props.content.map(
                                item => item.text
                            );

                            return (
                                <CodeBlock
                                    text={text.join(' ')}
                                    language='javascript'
                                    theme={dracula}
                                    showLineNumbers={false}
                                />
                            );
                        },
                        ul: ({ children }) => (
                            <ul className='list-disc list-inside my-2 bg-gray-100 p-2'>
                                {children}
                            </ul>
                        ),
                        li: ({ children }) => (
                            <li className='mb-4'>{children}</li>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default PostDetail;
