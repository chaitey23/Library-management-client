import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllBooks = () => {
    const [books, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewType, setViewType] = useState("card")
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
            <Loader2 className="w-10 h-10 animate-spin text-green-700"></Loader2>
        </div>
    }
    return (
        <div>
            <div className="mb-10 flex justify-end mt-4">
                <label className="mr-2 font-semibold">View:</label>
                <select
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="card">Card View</option>
                    <option value="table">Table View</option>
                </select>
            </div>
            {
                viewType === "card" ? (
                    <div className='p-6 grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {
                            books.map(book => (
                                <div key={book._id} className='bg-white border border-gray-200  shadow-xl flex flex-col  p-5 transition-shadow ' >
                                    <div className='flex justify-center mb-4'>
                                        <img src={book.image} alt={book.name} className="h-60 w-auto object-contain mb-4 mx-auto" />
                                    </div>
                                    <h2 className="text-xl font-semibold mt-2">{book.name}</h2>
                                    <p>Author: {book.author}</p>
                                    <p>Category: {book.category}</p>
                                    <p>Rating: ⭐ {book.rating}</p>
                                    <Link to={`/update/${book._id}`}>
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
                                    books.map(book => (
                                        <tr key={book._id} className="text-center border-b hover:bg-gray-50">
                                            <td className="p-2 md:text-base"><img src={book.image} alt={book.name} className="h-20 w-auto mx-auto" /></td>
                                            <td className="p-2 md:text-base">{book.name}</td>
                                            <td className="p-2 md:text-base ">{book.author}</td>
                                            <td className="p-2 md:text-base">{book.category}</td>
                                            <td className="p-2 md:text-base">⭐ {book.rating}</td>
                                            <td className="p-2 md:text-base ">
                                                <Link to={`/update/${book._id}`}>
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