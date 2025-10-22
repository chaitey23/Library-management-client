import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, User } from 'lucide-react';
import { Link } from 'react-router';

const FeaturedBooks = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedBooks();
    }, []);

    const fetchFeaturedBooks = async () => {
        try {
            const response = await fetch('https://library-management-level-1.vercel.app/books');
            const allBooks = await response.json();

            // Get highest rated books or latest books
            const highestRated = allBooks
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 4);

            setFeaturedBooks(highestRated);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching books:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='mb-20 px-4 sm:px-6 lg:px-8 mt-24'>
                <div className="text-center mb-12">
                    <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-[#1a4137]'>
                        Featured Books
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded mb-4"></div>
                            <div className="h-10 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className='mb-20 px-4 sm:px-6 lg:px-8'>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-[#1a4137]'>
                    Featured Books
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover our most popular and highly-rated books loved by readers
                </p>
            </motion.div>

            {/* Books Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {featuredBooks.map((book, index) => (
                    <motion.div
                        key={book._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Book Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"}
                                alt={book.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 bg-[#1a4137] text-white text-sm rounded-full">
                                    {book.category}
                                </span>
                            </div>
                        </div>

                        {/* Book Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#1a4137] mb-2 line-clamp-1">
                                {book.name}
                            </h3>

                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                                <User size={16} />
                                <span className="text-sm">{book.author}</span>
                            </div>

                            {book.publishedYear && (
                                <div className="flex items-center gap-2 text-gray-600 mb-3">
                                    <Calendar size={16} />
                                    <span className="text-sm">{book.publishedYear}</span>
                                </div>
                            )}

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < Math.floor(book.rating || 0)
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">({book.rating || 0})</span>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {book.description || "A wonderful book for readers."}
                            </p>

                            {/* Available Quantity */}
                            <div className="mb-4">
                                <span className={`text-sm font-medium ${book.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {book.quantity > 0 ? `${book.quantity} Available` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Link
                                    to={`/book/${book._id}`}
                                    className="flex-1 text-center bg-[#1a4137] text-white py-2 rounded-lg hover:bg-[#2a5c4f] transition-all duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View All Books Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-center mt-12"
            >
                <Link
                    to="/all-books"
                    className="inline-flex items-center gap-2 bg-[#1a4137] text-white px-8 py-3 rounded-lg hover:bg-[#2a5c4f] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    View All Books
                </Link>
            </motion.div>
        </div>
    );
};

export default FeaturedBooks;