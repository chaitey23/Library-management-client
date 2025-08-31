// import axios from 'axios';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// const AddBook = () => {
//     const initialState = {
//         image: "",
//         name: "",
//         quantity: "",
//         author: "",
//         category: "Novel",
//         shortDesc: "",
//         rating: "",
//     }
//     const baseUrl = import.meta.env.VITE_BASE_URL;    const [bookData, setBookData] = useState(initialState)
//     const handleChange = e => {
//         const { name, value } = e.target;
//         setBookData({ ...bookData, [name]: value })
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${baseUrl}/books`, bookData);
//             setBookData(initialState)
//             // toast.success("Book added successfully!")
//         } catch(err) {
//             toast.error("failed to add a book")
//         }
//     }
//     return (
//         <div className="max-w-3xl mx-auto p-8 bg-base-100 shadow-2xl rounded-lg mt-8">
//             <h1 className="text-4xl font-extrabold  text-center mb-6 text-[#1a4137] italic">
//                 Add New Book
//             </h1>
//             <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//                     <div>
//                     <label className="block font-semibold mb-1">Image URL</label>
//                     <input
//                         type="text"
//                         name="image"
//                         placeholder="Book Cover Image URL"
//                         value={bookData.image}
//                         onChange={handleChange}
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>
//                 </div>

//                 <div>
//                     <label className="block font-semibold mb-1">Book Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter Book Name"
//                         value={bookData.name}
//                         onChange={handleChange}
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-semibold mb-1">Quantity</label>
//                     <input
//                         type="number"
//                         name="quantity"
//                         placeholder="Number of Books"
//                         value={bookData.quantity}
//                         onChange={handleChange}
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-semibold mb-1">Author Name</label>
//                     <input
//                         type="text"
//                         name="author"
//                         placeholder="Author Name"
//                         value={bookData.author}
//                         onChange={handleChange}
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-semibold mb-1">Category</label>
//                     <select
//                         name="category"
//                         value={bookData.category}
//                         onChange={handleChange}
//                         className="select select-bordered w-full"
//                     >
//                         <option value="Novel">Novel</option>
//                         <option value="Thriller">Thriller</option>
//                         <option value="History">History</option>
//                         <option value="Drama">Drama</option>
//                         <option value="Sci-Fi">Sci-Fi</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block font-semibold mb-1">Short Description</label>
//                     <input
//                         type="text"
//                         name="shortDesc"
//                         placeholder="Brief Description"
//                         value={bookData.shortDesc}
//                         onChange={handleChange}
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-semibold mb-1">Rating (1-5)</label>
//                     <input
//                         type="number"
//                         name="rating"
//                         placeholder="Enter Rating"
//                         value={bookData.rating}
//                         onChange={handleChange}
//                         min="1"
//                         max="5"
//                         className="input input-bordered w-full"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-[#1a4137] hover:bg-[#16352d] text-[#c6d936] font-bold p-3 rounded-lg mt-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"    >
//                     Add Book
//                 </button>
//             </form>

//             <p className="mt-6 text-gray-600 text-center italic">
//                 This book will be added to the library system for students to borrow.
//             </p>
//         </div>
//     );
// };

// export default AddBook;