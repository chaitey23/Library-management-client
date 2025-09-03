import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const BorrowedBooks = () => {
    const { user } = useContext(AuthContext);
    const [borrowed, setBorrowed] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${baseUrl}/borrowed-books/${user.email}`)
                .then(res => setBorrowed(res.data))
                .catch(err => console.error(err));
        }
    }, [baseUrl, user]);
    const handleReturn = async (borrowedId) => {
        try {
            const res = await axios.put(`${baseUrl}/borrowed-books/return/${borrowedId}`);
            if (res.data.message === "Book returned successfully") {
                toast.success(res.data.message)
                setBorrowed(prev => prev.filter(b => b._id !== borrowedId))
            }
            else {
                toast.error(res.data.message || "Something went wrong!")
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to return book")
        }
    }

    return (
        <div className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">

                {borrowed.length === 0 ? (
                    <p className="text-gray-600 text-lg text-center">
                        You have no borrowed books.
                    </p>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold text-center text-[#1a4137] mb-8">
                            My Borrowed Books
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {borrowed.map(book => (
                                <div
                                    key={book._id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-5 flex flex-col"
                                >
                                    <div className="flex justify-center mb-4">
                                        {book.bookImage ? (
                                            <img
                                                src={book.bookImage}
                                                alt={book.bookName}
                                                className="h-60 w-auto object-contain rounded"
                                            />
                                        ) : (
                                            <div className="h-60 w-full flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-semibold mb-2">{book.bookName}</h3>
                                    <p className="text-gray-600 mb-1">
                                        <span className="font-medium">Borrowed At:</span>{' '}
                                        {new Date(book.borrowedAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        <span className="font-medium">Return Date:</span>{' '}
                                        {new Date(book.returnDate).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </p>

                                    <button onClick={() => handleReturn(book._id)} className="mt-auto px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition cursor-pointer">
                                        Return
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BorrowedBooks;
