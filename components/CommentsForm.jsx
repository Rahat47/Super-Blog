import { useState, useEffect, useRef } from 'react';

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className=' text-center text-xl mb-8 font-semibold border-b pb-4'>
                CommentsForm
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

            {error && (
                <p className='text-red-500 text-xs'>All fields are required</p>
            )}
        </div>
    );
};

export default CommentsForm;
