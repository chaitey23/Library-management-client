import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import UsePageTitle from '../../hooks/UsePageTitle';

const AllBooks = () => {
    UsePageTitle("All-Books");
    const [books, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState("card");
    const [showAvailable,setShowAvailable] = useState(false)
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
    if (loading) {
        return <div className='flex justify-center items-center min-h-[60vh]'>
            <Loader2 className="w-10 h-10 animate-spin text-green-700">
            </Loader2>
        </div>
    }
    const displayedBooks = showAvailable ? books.filter(book => book.quantity > 0):books;
    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-12">
              <button className='text-center bg-gradient-to-r from-[#c6d936] to-[#6dd36d] text-white px-6 py-2 md:px-6 md:py-2 rounded-full cursor-pointer text-sm sm:text-base transition hover:from-[#b0c42d] hover:to-[#a0c32d]' onClick={()=>setShowAvailable(!showAvailable)}>   {showAvailable ? "Show All Books" : "Show Available Books"}</button>
              <div className='flex items-center space-x-2 mt-2 md:mt-0'>
                  <label className="font-semibold text-sm sm:text-base">View:</label>
                <select
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                    className="select select-bordered w-full md:w-auto text-sm sm:text-base"
                >
                    <option value="card">Card View</option>
                    <option value="table">Table View</option>
                </select>
              </div>
            </div>
            {displayedBooks.length === 0? (  <div className='flex justify-center items-center min-h-[40vh] text-xl font-semibold text-gray-500'>
                    No Books Found
                </div>):
                viewType === "card" ? (
                    <div className='p-6 grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            displayedBooks.map(book => (
                                <div key={book._id} className='bg-white border border-gray-200  shadow-xl flex flex-col  p-5 transition-shadow ' >
                                    <div className='flex justify-center mb-4'>
                                        <img src={book.image} alt={book.name} className="h-60 w-auto object-contain mb-4 mx-auto"
                                        loading='lazy' />
                                    </div>
                                    <h2 className="text-xl font-semibold mt-2">{book.name}</h2>
                                    <p>Author: {book.author}</p>
                                    <p>Category: {book.category}</p>
                                    <p>Rating: ⭐ {book.rating}</p>
                                    <Link to={`/update-book/${book._id}`}>
                                        <button className="
     
w-full font-semibold transition-all duration-300  px-2 py-2  rounded-2xl text-[#1a4137] mt-2 hover:text-[#c6d936]  cursor-pointer bg-green-100 hover:bg-[#1a4137]">
                                            Update
                                        </button>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className="table-auto min-w-full border-gray-300">
                            <thead>
                                <tr className='bg-[#1a4137] text-[#c6d936]'>
                                    <th className="text-left py-3 px-4 text-sm md:text-base uppercase font-semibold" >Image</th>
                                    <th className="text-left py-3 px-4 text-sm md:text-base uppercase font-semibold">Name</th>
                                    <th className="text-left py-3 px-4 text-sm md:text-base uppercase font-semibold">Author</th>
                                    <th className="text-left py-3 px-4 text-sm md:text-base uppercase font-semibold">Category</th>
                                    <th className="text-left py-3 px-4 text-sm md:text-base uppercase font-semibold">Rating</th>
                                    <th className="text-left py-3 px-4 text-sm md:text-base uppercase font-semibold">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    displayedBooks.map(book => (
                                        <tr key={book._id} className="text-center border-b hover:bg-gray-50">
                                            <td className="p-2 md:text-base"><img src={book.image} alt={book.name} className="h-20 w-auto mx-auto" /></td>
                                            <td className="p-2 md:text-base">{book.name}</td>
                                            <td className="p-2 md:text-base ">{book.author}</td>
                                            <td className="p-2 md:text-base">{book.category}</td>
                                            <td className="p-2 md:text-base">⭐ {book.rating}</td>
                                            <td className="p-2 md:text-base ">
                                                <Link to={`/update-book/${book._id}`}>
                                                    <button className="text-emerald-950 hover:bg-[#1a4137] hover:text-[#c6d936] cursor-pointer px-3 py-1 rounded-lg">
                                                        Update
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>



    );
};

export default AllBooks;