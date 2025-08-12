import React, { useContext, useState } from 'react';
import navLogo from '../../assets/bookLogo.jpg';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { NavLink } from 'react-router';

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign-out successfully");
        setShowModal(false);
        setIsMenuOpen(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
const activeClass = "underline !bg-transparent text-[#1a4137]";
  const links = (
    <>
      <li className='text-lg text-[#1a4137]'><NavLink to='/' onClick={() => setIsMenuOpen(false)} className={({isActive}) => isActive ? activeClass :"text-[#1a4137] !bg-transparent hover:!bg-[#c6d936] hover:text-white"}>Home</NavLink></li>
      {user && (
        <>
          <li className='text-lg text-[#1a4137]'><NavLink to="/all-books" onClick={() => setIsMenuOpen(false)}className={({isActive}) => isActive ? activeClass :"text-[#1a4137] !bg-transparent  hover:!bg-[#c6d936] hover:text-white"}>All Books</NavLink></li>
          <li className='text-lg text-[#1a4137]'><NavLink to="/add-book" onClick={() => setIsMenuOpen(false)}className={({isActive}) => isActive ? activeClass :"text-[#1a4137] !bg-transparent  hover:!bg-[#c6d936] hover:text-white"}>Add Book</NavLink></li>
          <li className='text-lg text-[#1a4137]'><NavLink to="/borrowed-books" onClick={() => setIsMenuOpen(false)}className={({isActive}) => isActive ? activeClass :"text-[#1a4137] !bg-transparent  hover:!bg-[#c6d936] hover:text-white"}>Borrowed Books</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar mt-2 bg-base-100 sticky shadow-sm top-0 z-50">
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
          <img className='h-12 w-auto border-2 border-[#1a4137]  rounded-full' src={navLogo} alt="Logo" />
          <span className=" lg:text-3xl md:text-2xl font-bold text-[#1a4137]">BookZone</span> 
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-3">
          {user ? (
            <div className='flex gap-2 items-center'>
              {user.photoURL && (
                <div className='tooltip tooltip-bottom' data-tip={user.displayName || "User"}>
                  <img
                    className='w-10 h-10 rounded-full object-cover'
                    src={user.photoURL}
                    alt="User"
                  />
                </div>
              )}
              <button onClick={() => setShowModal(true)} className='btn rounded-3xl border-[#1a4137] border-2'>
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink className='btn rounded-3xl border-[#1a4137] hover:bg-[#1a4137] hover:text-white' to='/login'>Login</NavLink>
              <NavLink className='btn rounded-3xl bg-[#1a4137] text-white' to='/register'>Sign Up</NavLink>
            </>
          )}
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0  bg-white shadow-md z-40">
            <ul className="menu menu-vertical p-4 gap-2">{links}</ul>
          </div>
        )}
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg text-[#1a4137] font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="btn btn-sm text-white bg-[#1a4137]"
              >
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
