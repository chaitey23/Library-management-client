import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import UsePageTitle from '../../hooks/UsePageTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddBook = () => {
    UsePageTitle("Add-Book")
    const navigate = useNavigate();
    const initialState = {
        image: "",
        name: "",
        quantity: "",
        author: "",
        category: "Novel",
        shortDesc: "",
        rating: "",
        price: "",
    }
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const axiosSecure = useAxiosSecure()
    const [bookData, setBookData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const handleChange = e => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const dataToSend = {
            ...bookData,
            quantity: Number(bookData.quantity),
            rating: Number(bookData.rating),
            price: Number(bookData.price)
        };
        try {
            await axiosSecure.post(`${baseUrl}/books`, dataToSend);
            setBookData(initialState)
            toast.success("Book added successfully!")
            navigate("/all-books")
        } catch (err) {
            console.error(err)
            toast.error("Failed to add a book")
        }
        finally {
            setLoading(false);
        }
    }
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data.secure_url) return data.secure_url;

        throw new Error("Image upload failed");
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const url = await uploadImageToCloudinary(file);
            setBookData(prev => ({ ...prev, image: url }));
            toast.success("Image uploaded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Image upload failed");
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-base-100 shadow-2xl rounded-lg mt-8">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 text-[#1a4137] italic">
                Add New Book
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className="block font-semibold mb-1">Image</label>
                        <input
                            type="file"
                            accept='image/*'
                            name='image'
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                file:mr-4 file:py-2 file:px-4 
                                file:rounded-md file:border-0
                                file:text-sm file:font-medium
                                file:bg-[#1a4137] file:text-[#c6d936]
                                hover:file:bg-[#16352d] cursor-pointer"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Book Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Book Name"
                            value={bookData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className="block font-semibold mb-1">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Number of Books"
                            value={bookData.quantity}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Author Name</label>
                        <input
                            type="text"
                            name="author"
                            placeholder="Author Name"
                            value={bookData.author}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label className="block font-semibold mb-1">Category</label>
                        <select
                            name="category"
                            value={bookData.category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="Novel">Novel</option>
                            <option value="Thriller">Thriller</option>
                            <option value="History">History</option>
                            <option value="Drama">Drama</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>

                    {/* New Price Field */}
                    <div>
                        <label className="block font-semibold mb-1">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter Book Price"
                            value={bookData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-1">Short Description</label>
                    <input
                        type="text"
                        name="shortDesc"
                        placeholder="Brief Description"
                        value={bookData.shortDesc}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Rating (1-5)</label>
                    <input
                        type="number"
                        name="rating"
                        placeholder="Enter Rating"
                        value={bookData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1a4137] hover:bg-[#16352d] text-[#c6d936] font-bold p-3 rounded-lg mt-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg items-center flex justify-center"
                >
                    {
                        loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Book"
                    }
                </button>
            </form>

            <p className="mt-6 text-gray-600 text-center italic">
                This book will be added to the library system for students to borrow.
            </p>
        </div>
    );
};

export default AddBook;