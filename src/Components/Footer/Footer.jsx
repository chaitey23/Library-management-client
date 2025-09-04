import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="mt-28">
      <footer className="bg-[#0f2620] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#1a4137] p-3 rounded-full">
              <span className="text-[#c6d936] text-2xl"><GoMail /></span>
            </div>
            <h3 className="text-3xl font-bold">Subscribe to Library Updates</h3>
          </div>
          <div className="flex items-center w-full md:w-1/2 bg-[#1a4137] rounded-full p-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-5 py-3 bg-transparent outline-none text-white"
            />
            <button className="bg-gradient-to-r from-[#c6d936] to-[#6dd36d] px-5 py-4 rounded-full">
           <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
       
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">LibraryHub</h2>
          <p className="text-sm mb-4">
            Explore, Borrow, and Read from thousands of books in our collection.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/chaetey001" target="_blank" className="bg-[#1a4137] p-3 rounded-full hover:bg-[#c6d936] hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#1a4137] p-3 rounded-full hover:bg-[#c6d936] hover:text-black transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-[#1a4137] p-3 rounded-full hover:bg-[#c6d936] hover:text-black transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#c6d936]">Home</a></li>
            <li><a href="/categories" className="hover:text-[#c6d936]">Categories</a></li>
            <li><a href="/all-books" className="hover:text-[#c6d936]">All Books</a></li>
            <li><a href="/contact" className="hover:text-[#c6d936]">Contact Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#c6d936]">Borrowing Policy</a></li>
            <li><a href="#" className="hover:text-[#c6d936]">Return Policy</a></li>
            <li><a href="#" className="hover:text-[#c6d936]">Privacy & Policy</a></li>
            <li><a href="#" className="hover:text-[#c6d936]">Help Center</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +880 1234 567 890</li>
            <li>📧 support@libraryhub.com</li>
            <li>📍 44 Danvers, NY City, USA, 70-102</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0c1a15] py-4 text-center text-sm text-gray-400">
        Copyright © 2025 <span className="text-[#c6d936]">LibraryHub</span>. All Rights Reserved.
      </div>
    </footer>
    </div>
  );
};

export default Footer;
