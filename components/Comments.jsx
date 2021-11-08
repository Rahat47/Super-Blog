import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';
import { useEffect, useState } from 'react';

const Comments = ({ slug }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then(result => {
            setComments(result);
        });
    }, []);

    console.log(comments);
    return (
        <>
            {comments.length > 0 && (
                <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                        {comments.length}
                        {comments.length > 1 ? ' Comments' : ' Comment'}
                    </h3>

                    {comments.map(comment => (
                        <div
                            key={comment.createdAt}
                            className='border-b border-gray-100 mb-4 pb-4'
                        >
                            <p className='mb-4'>
                                <span className='font-semibold'>
                                    {comment.name}
                                </span>{' '}
                                On{' '}
                                {moment(comment.createdAt).format(
                                    'MMM Do YYYY'
                                )}
                            </p>
                            <p className='whitespace-pre-line text-gray-600 w-full'>
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Comments;
