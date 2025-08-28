// import axios from 'axios';
// import { Loader2 } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router';

// const AllBooks = () => {
//     const [books, setBook] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const baseURL = import.meta.env.VITE_BASE_URL;
//     useEffect(() => {
//         axios.get(`${baseURL}/books`)
//             .then((res) => {
//                 setBook(res.data)
//                 setLoading(false)

//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false)
//             })
//     }, [])
//     if (loading) {
//         return <div className='flex justify-center items-center min-h-[60vh]'>
//             <Loader2 className="w-10 h-10 animate-spin text-green-700"></Loader2>
//         </div>
//     }
//     return (
//         <div className='p-6 grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//             {
//                 books.map(book => (
//                     <div key={book._id} className='bg-white border border-gray-200  shadow-md flex flex-col  p-5 transition-shadow ' >
//                         <div className='flex justify-center mb-4'>
//                             <img src={book.image} alt={book.name} className="h-60 w-auto object-contain mb-4" />
//                         </div>
//                         <h2 className="text-xl font-semibold mt-2">{book.name}</h2>
//                         <p>Author: {book.author}</p>
//                         <p>Category: {book.category}</p>
//                         <p>Rating: ⭐ {book.rating}</p>
//                         <Link to={`/update/${book._id}`}>
//                             <button className="bg-[#1a4137] text-[#c6d936] px-4 py-2 mt-3 rounded-lg cursor-pointer">
//                                 Update
//                             </button>
//                         </Link>
//                     </div>
//                 ))
//             }
//         </div>
//     );
// };

// export default AllBooks;