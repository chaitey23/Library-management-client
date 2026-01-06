import axios from 'axios';
import { Loader2, Eye, Edit } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import UsePageTitle from '../../hooks/UsePageTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const AllBooks = () => {
    const axiosSecure = useAxiosSecure()
    UsePageTitle("All-Books");
    const [books, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState("card");
    const [showAvailable, setShowAvailable] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const baseURL = import.meta.env.VITE_BASE_URL;
    const { isAdmin } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${baseURL}/books`)
            .then((res) => {
                setBook(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }, [])

    const getSortedBooks = () => {
        let sortedBooks = [...displayedBooks];

        switch (sortOption) {
            case "price-asc":
                sortedBooks.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case "price-desc":
                sortedBooks.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case "rating-desc":
                sortedBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "name-asc":
                sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return sortedBooks;
    }

    const displayedBooks = showAvailable ? books.filter(book => book.quantity > 0) : books;
    const sortedBooks = getSortedBooks();

    if (loading) {
        return <div className='flex justify-center items-center min-h-[60vh]'>
            <Loader2 className="w-10 h-10 animate-spin text-green-700" />
        </div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-[#1a4137] mb-4">All Books</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Browse through our complete collection of books. Filter by availability and sort by your preference.
                </p>
            </div>

            <div className="mb-8 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <button
                        className={`px-6 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 ${showAvailable
                            ? 'bg-gradient-to-r from-[#c6d936] to-[#6dd36d] text-white'
                            : ' text-gray-700 hover:bg-gray-200 cursor-pointer border-2 border-[#c6d936]'
                            }`}
                        onClick={() => setShowAvailable(!showAvailable)}
                    >
                        {showAvailable ? "Show All Books" : "Show Available Only"}
                    </button>

                    <div className="flex items-center px-4 py-3 bg-[#1a4137] text-white rounded-full">
                        <span className="font-semibold">
                            {sortedBooks.length} {sortedBooks.length === 1 ? 'Book' : 'Books'} Found
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-[#1a4137] whitespace-nowrap">Sort by:</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="select select-bordered bg-white border-2 border-[#1a4137] text-[#1a4137] font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6d936]"
                        >
                            <option value="">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating-desc">Highest Rating</option>
                            <option value="name-asc">Name: A to Z</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-[#1a4137] whitespace-nowrap">View:</label>
                        <select
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value)}
                            className="select select-bordered bg-white border-2 border-[#1a4137] text-[#1a4137] font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6d936]"
                        >
                            <option value="card">Card View</option>
                            <option value="table">Table View</option>
                        </select>
                    </div>
                </div>
            </div>

            {sortedBooks.length === 0 ? (
                <div className='flex flex-col justify-center items-center min-h-[40vh] text-center'>
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-2xl font-semibold text-gray-500 mb-2">No Books Found</h3>
                    <p className="text-gray-600">Try adjusting your filters or check back later.</p>
                </div>
            ) : viewType === "card" ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {sortedBooks.map(book => (
                        <div
                            key={book._id}
                            className='bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group hover:border-[#1a4137]/20'
                        >
                            {/* Card Header with Image */}
                            <Link
                                to={`/book/${book._id}`}
                                className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center p-4 group/image"
                            >
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="h-52 w-auto object-contain transition-transform duration-300 group-hover/image:scale-105"
                                    loading='lazy'
                                />
                                {/* View Overlay - Shows on hover */}
                                <div className="absolute inset-0 bg-[#1a4137]/0 group-hover/image:bg-[#1a4137]/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                                    <div className="text-white text-center p-4">
                                        <Eye className="w-8 h-8 mx-auto mb-2" />
                                        <span className="font-semibold">View Details</span>
                                    </div>
                                </div>

                                {/* Availability Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${book.quantity > 0
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                        }`}>
                                        {book.quantity > 0 ? `${book.quantity} Available` : 'Out of Stock'}
                                    </span>
                                </div>
                            </Link>

                            {/* Card Content */}
                            <div className='p-5 flex flex-col flex-grow'>
                                <div className="mb-3">
                                    <h2 className="text-xl font-bold text-[#1a4137] line-clamp-2 mb-1 hover:text-[#2a5c4f] transition-colors">
                                        <Link to={`/book/${book._id}`} className="hover:underline">
                                            {book.name}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium">by {book.author}</span>
                                    </p>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Category</span>
                                        <span className="px-3 py-1 bg-[#c6d936]/10 text-[#1a4137] rounded-full text-sm font-semibold">
                                            {book.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Rating</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="font-semibold">{book.rating}/5</span>
                                        </div>
                                    </div>
                                    {book.price && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">Price</span>
                                            <span className="text-lg font-bold text-[#1a4137]">
                                                ${book.price}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    {isAdmin ? (
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/book/${book._id}`}
                                                    className="flex-1"
                                                >
                                                    <button className="w-full flex items-center justify-center gap-2 text-[#1a4137] font-medium py-2.5 px-4 rounded-lg hover:bg-[#1a4137]/5 transition-all duration-300 border border-[#1a4137] hover:border-[#2a5c4f]">
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </button>
                                                </Link>
                                                <Link
                                                    to={`/update-book/${book._id}`}
                                                    className="flex-1"
                                                >
                                                    <button className="w-full flex items-center justify-center gap-2 bg-[#1a4137] text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-[#2a5c4f] transition-all duration-300">
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                </Link>
                                            </div>

                                        </div>
                                    ) : (
                                        <Link to={`/book/${book._id}`}>
                                            <button className="w-full bg-gradient-to-r from-[#c6d936] to-[#6dd36d] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer">
                                                View Book Details
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className='bg-gradient-to-r from-[#1a4137] to-[#2a5c4f] text-white'>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Book</th>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Author</th>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Category</th>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Rating</th>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Price</th>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sortedBooks.map((book) => (
                                    <tr
                                        key={book._id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <Link to={`/book/${book._id}`} className="flex items-center">
                                                    <img
                                                        src={book.image}
                                                        alt={book.name}
                                                        className="h-14 w-10 object-cover rounded shadow-sm border border-gray-200"
                                                    />
                                                    <div className="ml-4">
                                                        <h3 className="font-semibold text-[#1a4137] hover:text-[#2a5c4f] hover:underline">
                                                            {book.name}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-gray-700">{book.author}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1 bg-[#c6d936]/10 text-[#1a4137] rounded-full text-sm font-semibold">
                                                {book.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                                    <span className="text-yellow-500">⭐</span>
                                                    <span className="font-semibold text-gray-700">{book.rating}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {book.price ? (
                                                <span className="font-bold text-[#1a4137]">
                                                    ${book.price}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${book.quantity > 0
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-red-100 text-red-800 border border-red-200'
                                                }`}>
                                                {book.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link to={`/book/${book._id}`}>
                                                    <button
                                                        className="flex items-center gap-2 text-[#1a4137] hover:text-[#2a5c4f] font-medium transition-colors cursor-pointer"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span>View</span>
                                                    </button>
                                                </Link>
                                                {isAdmin && (
                                                    <>
                                                        <span className="text-gray-300">|</span>
                                                        <Link to={`/update-book/${book._id}`}>
                                                            <button
                                                                className="flex items-center gap-2 text-[#1a4137] hover:text-[#2a5c4f] font-medium transition-colors cursor-pointer"
                                                                title="Update Book"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                                <span>Edit</span>
                                                            </button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBooks;