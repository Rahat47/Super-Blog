import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(categories => {
            setCategories(categories);
        });
    }, []);

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            Super Blog
                        </span>
                    </Link>
                </div>

                <div className='hidden md:float-left md:contents'>
                    {categories.map(catgory => (
                        <Link
                            href={`category/${catgory.slug}`}
                            key={catgory.slug}
                        >
                            <span className='md:float-right p-3 mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-700 '>
                                {catgory.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
