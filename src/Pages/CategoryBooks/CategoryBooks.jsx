import axios from 'axios';
import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router';

const CategoryBooks = () => {
    const { name } = useParams();
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/books/category/${name}`)
            .then((res) => {
                setBooks(res.data)
            })
            .catch((err) => {
                console.error(err);

            })
    }, [name])
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<Star key={i} className='w-5 h-5 fill-yellow-500 text-yellow-500'></Star>)
            }
            else if (rating >= i - 0.5) {
                stars.push(
                    <div key={i} className="relative w-5 h-5">

                        <Star className="w-5 h-5 text-yellow-500" />

                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 absolute left-0 top-0 overflow-hidden"
                            style={{ clipPath: "inset(0 50% 0 0)" }} />
                    </div>
                )
            } else {
                stars.push(<Star key={i} className="w-5 h-5 text-yellow-500" />);

            }
        }
        return stars;
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-10'>
            <h1 className='text-4xl font-bold text-[#1a4137] text-center mt-5 mb-10'>{`${name} Books`}</h1>
            {
                books.length === 0 && (
                    <p>No books found in this category</p>)
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    books.map((book,index) => (
                        <motion.div key={book._id} className='bg-white border border-gray-200  shadow-md flex flex-col  p-5 transition-shadow duration-300 hover:shadow-lg hover:border-black group'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5,delay:index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                        >

                            <div className='flex justify-center mb-4'>
                                <img className='h-60 w-auto object-contain mb-4 ' src={book.image} alt={book.name} />
                            </div>
                            <h1 className='text-red-500 font-bold'>{book.name}</h1>
                            <p className='font-semibold textarea-lg'>Author: {book.author}</p>
                            <p className='text-gray-500'>Category: {book.category}</p>
                            <p className='text-gray-500'>Quantity : {book.quantity}</p>
                            <div className='flex items-center space-x-1 mb-2'>
                                {
                                    renderStars(book.rating)
                                }
                                <span className="ml-2 text-gray-600">({book.rating})</span>
                            </div>
                            <Link to={`/book/${book._id}`} className='font-medium 
                                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right text-[#1a4137]   hover:underline'>
                                VIEW DETAILS
                            </Link>
                        </ motion.div>
                    ))

                }
            </div>

        </div>

    );
};

export default CategoryBooks;