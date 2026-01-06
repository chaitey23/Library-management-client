import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import loginAnimation from "../../assets/login-animation.json";
import Lottie from 'lottie-react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then((result) => {
                form.reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${result.user.email}!`,
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate(from, { replace: true });
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate(from, { replace: true });
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 sm:px-6">
            <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl lg:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                {/* Form Section */}
                <div className="p-6 sm:p-8 md:p-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#1a4137]">
                        Login Now
                    </h2>

                    <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-5">
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

                        <button
                            type="submit"
                            className="w-full py-3 sm:py-3.5 bg-[#c6d936] text-white rounded-xl font-semibold cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
                        <button
                            onClick={handleGoogleSignIn}
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
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-[#102930]">
                            Sign Up here
                        </Link>
                    </p>
                </div>

                {/* Animation Section */}
                <div className="hidden lg:flex items-center justify-center p-6">
                    <div className="w-full max-w-md">
                        <Lottie animationData={loginAnimation} loop />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
