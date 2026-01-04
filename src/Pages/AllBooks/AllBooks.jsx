import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import UsePageTitle from '../../hooks/UsePageTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllBooks = () => {
    const axiosSecure = useAxiosSecure()
    UsePageTitle("All-Books");
    const [books, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState("card");
    const [showAvailable, setShowAvailable] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const baseURL = import.meta.env.VITE_BASE_URL;

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
            {/* Header Section */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-[#1a4137] mb-4">All Books</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Browse through our complete collection of books. Filter by availability and sort by your preference.
                </p>
            </div>

            {/* Controls Section */}
            <div className="mb-8 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Available Books Toggle */}
                    <button
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${showAvailable
                            ? 'bg-gradient-to-r from-[#c6d936] to-[#6dd36d] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        onClick={() => setShowAvailable(!showAvailable)}
                    >
                        {showAvailable ? "Show All Books" : "Show Available Only"}
                    </button>

                    {/* Results Count */}
                    <div className="flex items-center px-4 py-3 bg-[#1a4137] text-white rounded-full">
                        <span className="font-semibold">
                            {sortedBooks.length} {sortedBooks.length === 1 ? 'Book' : 'Books'} Found
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Sorting Dropdown */}
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

                    {/* View Toggle */}
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
                // Card View - Uniform Cards
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {sortedBooks.map(book => (
                        <div
                            key={book._id}
                            className='bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group'
                        >
                            {/* Uniform Image Container */}
                            <div className='h-64 overflow-hidden bg-gray-100 flex items-center justify-center p-4'>
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                    loading='lazy'
                                />
                            </div>

                            {/* Card Content - Uniform height */}
                            <div className='p-5 flex flex-col flex-grow'>
                                <h2 className="text-xl font-bold text-[#1a4137] mb-2 line-clamp-2">{book.name}</h2>
                                <p className="text-gray-600 mb-1"><span className="font-semibold">Author:</span> {book.author}</p>
                                <p className="text-gray-600 mb-1"><span className="font-semibold">Category:</span> {book.category}</p>
                                <p className="text-gray-600 mb-2"><span className="font-semibold">Rating:</span> ⭐ {book.rating}/5</p>

                                {/* Price Display - Add this */}
                                {book.price && (
                                    <p className="text-lg font-bold text-[#1a4137] mb-4">
                                        Price: ${book.price}
                                    </p>
                                )}

                                {/* Quantity Status */}
                                <div className="mb-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${book.quantity > 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {book.quantity > 0 ? `${book.quantity} Available` : 'Out of Stock'}
                                    </span>
                                </div>

                                {/* Update Button */}
                                <Link
                                    to={`/update-book/${book._id}`}
                                    className="mt-auto"
                                >
                                    <button className="w-full bg-[#1a4137] text-white font-semibold py-3 rounded-lg hover:bg-[#2a5c4f] transition-all duration-300 transform hover:scale-105">
                                        Update Book
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Table View
                <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className="min-w-full">
                            <thead>
                                <tr className='bg-[#1a4137] text-white'>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Image</th>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Book Details</th>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Category</th>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Rating</th>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Price</th>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Status</th>
                                    <th className="text-left py-4 px-6 font-semibold uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedBooks.map((book, index) => (
                                    <tr
                                        key={book._id}
                                        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                            }`}
                                    >
                                        <td className="py-4 px-6">
                                            <img
                                                src={book.image}
                                                alt={book.name}
                                                className="h-16 w-12 object-cover rounded shadow-sm"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <h3 className="font-semibold text-[#1a4137] text-lg">{book.name}</h3>
                                                <p className="text-gray-600 text-sm">by {book.author}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="bg-[#c6d936] text-[#1a4137] px-3 py-1 rounded-full text-sm font-semibold">
                                                {book.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">⭐</span>
                                                <span className="font-semibold">{book.rating}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {book.price ? (
                                                <span className="font-bold text-[#1a4137] text-lg">
                                                    ${book.price}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${book.quantity > 0
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {book.quantity > 0 ? 'Available' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link to={`/update-book/${book._id}`}>
                                                <button className="bg-[#1a4137] text-white px-4 py-2 rounded-lg hover:bg-[#2a5c4f] transition-colors font-semibold">
                                                    Update
                                                </button>
                                            </Link>
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