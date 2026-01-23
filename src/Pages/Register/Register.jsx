import React, { useState, useContext } from 'react';
import registerPicture from '../../assets/register.jpg';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
    const { createUser, googleSignIn, updateUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setPasswordError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;

        if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter!');
            return;
        }
        if (!/(?=.*[a-z])/.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter!');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long!');
            return;
        }
        createUser(email, password)
            .then(() => {
                updateUser({ displayName: name, photoURL: photo })
                    .then(async () => {
                        await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
                            name: name,
                            email: email
                        });
                        Swal.fire({ icon: 'success', title: 'Registration Successful!', text: 'Welcome!' });
                        form.reset();
                        navigate(location.state?.from || '/');
                    })
                    .catch(err => toast.error(err.message));
            })
            .catch(err => toast.error(err.message));

    };

    const handleRegisterGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful',
                    text: `Welcome ${result.user.displayName || ''}`,
                });
                navigate(location.state?.from || '/');
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 sm:px-6">
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl md:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <div className="p-6 sm:p-8 md:p-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#1a4137]">
                        Create an account
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name"
                            required
                            className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:outline-none"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:outline-none"
                        />

                        {passwordError && (
                            <p className="text-red-500 text-sm">{passwordError}</p>
                        )}

                        <input
                            type="text"
                            name="photo"
                            placeholder="Photo URL"
                            className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 sm:py-3.5 bg-[#c6d936] text-white rounded-xl font-semibold cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
                        <button
                            onClick={handleRegisterGoogleSignIn}
                            className="btn w-full sm:w-auto rounded-full bg-white text-black border-[#e5e5e5]"
                        >
                            <svg width="16" height="16" viewBox="0 0 512 512">
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                            </svg>
                            Login with Google
                        </button>

                        <button className="btn w-full sm:w-auto rounded-full bg-black text-white border-black">
                            Login with GitHub
                        </button>
                    </div>

                    <p className="text-sm mt-5 sm:mt-6 text-center text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[#102930]">
                            Login
                        </Link>
                    </p>
                </div>

                <div
                    className="hidden md:block bg-cover bg-center h-full min-h-[500px]"
                    style={{ backgroundImage: `url(${registerPicture})` }}
                />
            </div>
        </div>
    );
};

export default Register;
