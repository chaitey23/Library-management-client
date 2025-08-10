// import React, { useContext, useState } from 'react';
// import navLogo from '../../assets/bookLogo.jpg';
// import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
// import { NavLink } from 'react-router';

// const NavBar = () => {
//   const { user, signOutUser } = useContext(AuthContext);
//   const [showModal, setShowModal] = useState(false);

//   const handleSignOut = () => {
//     signOutUser()
//       .then(() => {
//         console.log("Sign-out successfully");
//         setShowModal(false);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   const links = (
//     <>
//       <li><NavLink to='/'>Home</NavLink></li>
//       {user && (
//         <>
//           <li><NavLink to="/all-books">All Books</NavLink></li>
//           <li><NavLink to="/add-book">Add Book</NavLink></li>
//           <li><NavLink to="/borrowed-books">Borrowed Books</NavLink></li>
//         </>
//       )}
//     </>
//   );

//   return (
//     <>
//       <div className="navbar bg-base-100 shadow-sm">
//                 <div className="navbar-start">
//           <div className='flex items-center gap-2'>
//             <img className='h-12 w-auto rounded-full' src={navLogo} alt="Logo" />
//             <span className="text-2xl font-bold">BookZone</span>
//           </div>
//         </div>

        
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">{links}</ul>
//         </div>

        
//         <div className="navbar-end gap-3">
//           {user ? (
//             <div className='flex gap-2 items-center'>
//               {user.photoURL && (
//                 <div className='tooltip tooltip-bottom' data-tip={user.displayName || "User"}>
//                   <img
//                     className='w-10 h-10 rounded-full object-cover'
//                     src={user.photoURL}
//                     alt="User"
//                   />
//                 </div>
//               )}
//               <button onClick={() => setShowModal(true)} className='btn  btn-sm'>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <>
//               <NavLink className='btn btn-sm' to='/login'>Login</NavLink>
//               <NavLink className='btn  btn-sm' to='/register'>Sign Up</NavLink>
//             </>
//           )}
//         </div>
//       </div>

    
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50  bg-opacity-40">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//             <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
//             <p className="mb-6">Are you sure you want to log out?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="btn btn-sm btn-ghost"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSignOut}
//                 className="btn btn-sm btn-error"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavBar;
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
        setIsMenuOpen(false); // menu close on logout
      })
      .catch(error => {
        console.error(error);
      });
  };

  const links = (
    <>
      <li><NavLink to='/' onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/all-books" onClick={() => setIsMenuOpen(false)}>All Books</NavLink></li>
          <li><NavLink to="/add-book" onClick={() => setIsMenuOpen(false)}>Add Book</NavLink></li>
          <li><NavLink to="/borrowed-books" onClick={() => setIsMenuOpen(false)}>Borrowed Books</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm relative">
        <div className="navbar-start flex items-center gap-2">
          {/* Hamburger button বামে */}
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

          {/* Logo + site name */}
          <img className='h-12 w-auto rounded-full' src={navLogo} alt="Logo" />
          <span className="text-2xl font-bold">BookZone</span>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* User login/logout */}
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
              <button onClick={() => setShowModal(true)} className='btn btn-sm'>
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink className='btn btn-sm' to='/login'>Login</NavLink>
              <NavLink className='btn btn-sm' to='/register'>Sign Up</NavLink>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-40">
            <ul className="menu menu-vertical p-4 gap-2">{links}</ul>
          </div>
        )}
      </div>

      {/* Logout confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
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
                className="btn btn-sm btn-error"
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
