import { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, []);

    const handleCommentSubmission = () => {
        setError(false);

        const comment = commentEl.current.value;
        const name = nameEl.current.value;
        const email = emailEl.current.value;

        const storeData = storeDataEl.current.checked;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = {
            comment,
            name,
            email,
            slug,
        };

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }

        submitComment(commentObj).then(res => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className=' text-center text-xl mb-8 font-semibold border-b pb-4'>
                Leave a comment
            </h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    ref={commentEl}
                    name='comment'
                    rows='8'
                    required
                    placeholder='Write your comment here...'
                    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input
                    type='text'
                    name='name'
                    required
                    ref={nameEl}
                    placeholder='Your name...'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                />
                <input
                    type='email'
                    name='email'
                    required
                    ref={emailEl}
                    placeholder='Your email...'
                    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                />
            </div>

            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input
                        ref={storeDataEl}
                        id='storeData'
                        type='checkbox'
                        name='storeData'
                        value={true}
                    />
                    <label
                        className='text-gray-500 cursor-pointer ml-2 '
                        htmlFor='storeData'
                    >
                        Save my email and name for the next time I comment!
                    </label>
                </div>
            </div>

            {error && (
                <p className='text-red-500 text-xs'>All fields are required</p>
            )}

            <div className='mt-8'>
                <button
                    type='button'
                    onClick={handleCommentSubmission}
                    className='transition duration-500 ease-in hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <p className='text-green-500 text-xl float-right font-semibold mt-3'>
                        Comment submitted for review.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CommentsForm;
