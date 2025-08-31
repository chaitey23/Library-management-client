import axios from 'axios';
import { Loader2, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL
    useEffect(() => {
        axios.get(`${baseUrl}/book/${id}`)
            .then((res) => {
                setBook(res.data)

            })
            .catch((err) => {
                console.log(err);

            })
    }, [id, baseUrl]);
    if (!book) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
        </div>

    )
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
         <div className='max-w-7xl mx-auto px-4 py-10 mt-8'>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
               
                <div className='w-full md:w-[320px] flex justify-center'>
                    <img src={book.image} alt={book.name} className='max-h-[400px] object-contain' />
                </div>

              
                <div className='flex-1 flex flex-col justify-center md:justify-start'>
                    <h1 className='text-4xl font-bold mb-4'>{book.name}</h1>

                    <div className='flex items-center space-x-1 mb-2'>
                        {renderStars(book.rating)}
                        <span className="ml-2 text-gray-600">({book.rating})</span>
                    </div>

                    <h2 className='text-xl font-semibold mb-1'>
                        By: <span className='font-normal'>{book.author}</span>
                    </h2>

                    <p className='text-lg mb-1'>
                        <span className='font-semibold'>Quantity:</span> {book.quantity}
                    </p>

                    <p className='text-gray-700 mt-2'>{book.shortDescription}</p>
                </div>
            </div>
        </div>
    );cle
};

export default BookDetails;