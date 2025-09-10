import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import UsePageTitle from '../../hooks/UsePageTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateBook = () => {
  UsePageTitle("UpdateBook");
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const axiosSecure = useAxiosSecure()
  const [bookData, setBookData] = useState({
    image: "",
    name: "",
    quantity: "",
    author: "",
    category: "Novel",
    shortDesc: "",
    rating: "",

  })
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    axiosSecure.get(`${baseURL}/book/${id}`)
      .then((res) => {
        setBookData({
          image: res.data.image || "",
          name: res.data.name || "",
          quantity: res.data.quantity || "",
          author: res.data.author || "",
          category: res.data.category || "Novel",
          shortDesc: res.data.shortDescription || "",
          rating: res.data.rating || "",
        })
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        toast.error("Failed to fetch book data!")
        setLoading(false)
      })
  },
    [id, baseURL, axiosSecure]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const dataToSend = {
      ...bookData,
      quantity: Number(bookData.quantity),
      rating: Number(bookData.rating)
    };
    try {
      await axiosSecure.put(`${baseURL}/book/${id}`, dataToSend);
      toast.success("Book updated successfully!")
      setUpdating(false);
      navigate("/all-books")
    } catch (err) {
      console.log(err);
      toast.error("Failed to update book!")
      setUpdating(false)
    }
  };
  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="w-10 h-10 animate-spin text-green-700" />
    </div>
  }
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-base-100 shadow-2xl rounded-lg mt-8">
      <h1 className="text-2xl md:text-4xl font-extrabold  text-center mb-6 text-[#1a4137] italic">
        Update Book
      </h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Book Cover Image URL"
              value={bookData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
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
        <div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
          disabled={updating}
          className="w-full bg-[#1a4137] hover:bg-[#16352d] text-[#c6d936] font-bold p-3 rounded-lg mt-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {updating ? "Updating..." : "Update Book"}
        </button>
      </form>

      <p className="mt-6 text-gray-600 text-center italic">
        This book will be added to the library system for students to borrow.
      </p>
    </div>
  );
};

export default UpdateBook;