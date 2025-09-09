import { Loader2, Star } from 'lucide-react';
import React, { use, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import UsePageTitle from '../../hooks/UsePageTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookDetails = () => {
    UsePageTitle("BookDetails");
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [returnDate, setReturnDate] = useState("");
    const [borrowLoading, setBorrowLoading] = useState(false);
    const axiosSecure = useAxiosSecure()
    const baseUrl = import.meta.env.VITE_BASE_URL
    useEffect(() => {
        axiosSecure.get(`${baseUrl}/book/${id}`)
            .then((res) => {
                setBook(res.data)
                setLoading(false);
            })
            .catch(() => {
                setLoading(false)

            })
    }, [id, baseUrl]);
    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
        </div>
    )
    if (!book) return (
        <div className="text-center py-10 text-xl text-gray-600">
            Book not found
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
    const handleBorrow = async (e) => {
        e.preventDefault();
        setBorrowLoading(true)
        try {
            const res = await axiosSecure.post(`${baseUrl}/borrow/${book._id}`, {
                userName: user.displayName,
                userEmail: user.email,
                returnDate
            });
            if (res.data.message === "Book borrowed successfully") {
                setBook(prev => ({ ...prev, quantity: prev.quantity - 1 }));
                setShowModal(false);
                setReturnDate("");
                navigate("/borrowed-books")
                toast.success("Book borrowed successfully!");
            } else {
                toast.error(res.data.message || "Something went wrong!");
            }


        } catch (error) {
            console.error(error);
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message)
            }
            else {
                toast.error("Failed to borrow  book!")
            }
        }
        finally {
            setBorrowLoading(false)
        }
    }
    return (
        <div className='max-w-7xl mx-auto px-4 py-10 mt-8'>
            <motion.div className='grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>

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
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setShowModal(true)}
                            disabled={book.quantity === 0}
                            className={`px-6 py-3 rounded-xl text-lg font-semibold transition 
              ${book.quantity === 0
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-[#c6d936] text-[#1a4137] hover:bg-[#b0c02f] cursor-pointer"}`}>
                            {book.quantity === 0 ? "Out of Stock" : "Borrow"}
                        </button>
                    </div>
                </div>
            </motion.div >
            {
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-xl text-[#1a4137] font-bold mb-4">Borrow This Book</h3>

                            <form onSubmit={handleBorrow}>

                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="w-full border p-2 rounded mb-2 bg-gray-100"
                                />


                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full border p-2 rounded mb-2 bg-gray-100"
                                />

                                <input
                                    type="date"
                                    required
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="w-full border p-2 rounded mb-2"
                                />

                                <div className="flex justify-end gap-2 mt-4">
                                    <button type="button" onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-[#c6d936] text-[#1a4137] cursor-pointer rounded flex items-center justify-center">{borrowLoading ? <Loader2 className='w-4 h-4 animate-spin'></Loader2> :
                                        "Confirm"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default BookDetails;