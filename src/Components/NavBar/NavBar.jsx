import React, { useContext, useState } from 'react';
import navLogo from '../../assets/bookLogo.jpg';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { NavLink } from 'react-router';
import { FaChevronDown, FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign-out successfully");
        setShowModal(false);
        setShowDropdown(false);
        setIsMenuOpen(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const activeClass = "underline !bg-transparent text-[#1a4137]";
  const links = (
    <>
      <li className='text-lg text-[#1a4137]'><NavLink to='/' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : "text-[#1a4137] !bg-transparent hover:!bg-[#c6d936] hover:text-white"}>Home</NavLink></li>
      <li className='text-lg text-[#1a4137]'><NavLink to="/all-books" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : "text-[#1a4137] !bg-transparent  hover:!bg-[#c6d936] hover:text-white"}>All Books</NavLink></li>
      <li className='text-lg text-[#1a4137]'>
        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : "text-[#1a4137] !bg-transparent hover:!bg-[#c6d936] hover:text-white"}>
          Contact
        </NavLink>
      </li>
      {user && (
        <>
          <li className='text-lg text-[#1a4137]'><NavLink to="/add-book" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : "text-[#1a4137] !bg-transparent  hover:!bg-[#c6d936] hover:text-white"}>Add Book</NavLink></li>
          <li className='text-lg text-[#1a4137]'><NavLink to="/borrowed-books" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : "text-[#1a4137] !bg-transparent  hover:!bg-[#c6d936] hover:text-white"}>Borrowed Books</NavLink></li>
        </>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="navbar bg-base-100 sticky top-0 z-50 w-full px-4 lg:px-8 shadow-sm border-b border-[#1a4137]">
        <div className="flex w-full justify-center py-3">
          <span className="loading loading-spinner text-[#1a4137]"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-50 w-full px-4 lg:px-8 shadow-sm border-b border-[#1a4137]">

        <div className="navbar-start flex items-center gap-2">
          <button
            className="lg:hidden btn btn-square btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img className='h-12 w-auto border-2 border-[#1a4137] rounded-full' src={navLogo} alt="Logo" />
          <span className="lg:text-3xl md:text-2xl font-bold text-[#1a4137]">BookZone</span>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-3 relative">
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.photoURL && (
                  <img
                    className='w-10 h-10 rounded-full object-cover border-2 border-[#1a4137] shadow-sm'
                    src={user.photoURL}
                    alt="User"
                  />
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1a4137] hidden md:inline">{user.displayName || "User"}</span>
                  <FaChevronDown className={`text-[#1a4137] transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      {user.photoURL && (
                        <img
                          className='w-10 h-10 rounded-full object-cover border border-[#1a4137]'
                          src={user.photoURL}
                          alt="User"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1a4137] text-sm truncate">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                  >
                    <FaSignOutAlt className="text-red-500 group-hover:text-red-600 transition-colors duration-200" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink className='btn rounded-3xl border-[#1a4137] hover:bg-[#1a4137] hover:text-white' to='/login'>Login</NavLink>
              <NavLink className='btn rounded-3xl bg-[#1a4137] text-white' to='/register'>Sign Up</NavLink>
            </>
          )}
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 bg-white shadow-md z-40 w-full border-t border-gray-200">
            <ul className="menu menu-vertical p-4 gap-2">{links}</ul>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80 mx-4 border border-gray-200">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaSignOutAlt className="text-red-500 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-[#1a4137] mb-2">Confirm Logout</h2>
              <p className="text-gray-600">Are you sure you want to log out of your account?</p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline border-[#1a4137] text-[#1a4137] hover:bg-[#1a4137] hover:text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="btn bg-[#1a4137] hover:bg-[#2a5c4f] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <FaSignOutAlt className="text-sm" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;