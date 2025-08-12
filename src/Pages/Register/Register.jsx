import React, { use, useState } from 'react';
import registerPicture from '../../assets/register.jpg'
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, googleSignIn, updateUser } = use(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const handleRegister = e => {
        e.preventDefault();
        setPasswordError("");
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        console.log(name, email, password, photo);
        if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter!")
            return;
        }
        if (!/(?=.*[a-z])/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter!")
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long!")
            return;
        }

        // createUser
        createUser(email, password)
            .then(result => {
                // console.log(result);
                updateUser({
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful!',
                            text: 'Welcome to our website!',
                        })
                    })
                    .catch(err => {
                        toast.error(err.message)
                    })


            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleRegisterGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful',
                    text: `Welcome ${result.user.displayName || ''}`,
                })
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="p-10">
                    <h2 className="text-3xl font-bold mb-8 text-[#1a4137]">Create an account</h2>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <input
                            type="text" name='name'
                            placeholder="Full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
                        />
                        <input
                            type="email" name='email'
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
                        />
                        <input
                            type="password" name='password'
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
                        />
                        {
                            passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        }
                        <input
                            type="text" name='photo'
                            placeholder="Photo URL"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full py-3
                             bg-[#c6d936] text-white rounded-xl font-semibold transition cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="flex justify-center gap-4 mt-6">
                        <button onClick={handleRegisterGoogleSignIn} className="btn rounded-full bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                        <button className="btn rounded-full bg-black text-white border-black">
                            <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            Login with GitHub
                        </button>
                    </div>
                    <p className="text-sm mt-6 text-center text-gray-500">
                        Already Have any account? <Link className="font-medium text-[#102930]" to='/login'>Login </Link>
                    </p>
                </div>
                <div className="hidden md:block bg-cover bg-center h-[600px]" style={{ backgroundImage: `url(${registerPicture})` }}>
                </div>

            </div>
        </div>
    );
};

export default Register;
