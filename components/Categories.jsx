import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '../services';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(categories => {
            setCategories(categories);
        });
    }, []);

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-center'>
                Categories
            </h3>

            {categories.map(category => (
                <Link href={`/category/${category.slug}`} key={category.slug}>
                    <a className='block pb-3 mb-3 p-4 text-center hover:bg-gray-100'>
                        {category.name}
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
