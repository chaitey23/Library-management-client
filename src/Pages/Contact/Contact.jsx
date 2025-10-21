import React, { useState } from 'react';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
    FaPaperPlane,
    FaBook,
    FaHeadset,
    FaCheckCircle,
    FaRegSmile,
    FaShieldAlt
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Show loading alert
        Swal.fire({
            title: 'Sending...',
            text: 'Please wait while we send your message',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Form submitted:', formData);

            // Show success alert
            Swal.fire({
                title: 'Message Sent Successfully!',
                text: 'Thank you for your message! We will get back to you within 24 hours.',
                icon: 'success',
                confirmButtonColor: '#1a4137',
                confirmButtonText: 'OK'
            });

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Sorry, there was an error sending your message. Please try again.',
                icon: 'error',
                confirmButtonColor: '#dc2626',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInstantHelp = () => {
        Swal.fire({
            title: 'Get Instant Help',
            html: `
                <div class="text-left">
                    <p class="mb-4">Choose how you'd like to get help:</p>
                    <div class="space-y-3">
                        <button onclick="window.open('tel:+15551234567', '_self')" 
                                class="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-3">
                            <i class="fas fa-phone"></i> Call Now: +1 (555) 123-4567
                        </button>
                        <button onclick="window.location.href='mailto:support@bookzone.com'" 
                                class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-3">
                            <i class="fas fa-envelope"></i> Email: support@bookzone.com
                        </button>
                    </div>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            width: '500px'
        });
    };

    const handleContactClick = (type, value, title) => {
        let action;
        let message;

        switch (type) {
            case 'email':
                action = `mailto:${value}`;
                message = `Ready to email us at ${value}?`;
                break;
            case 'phone':
                action = `tel:${value}`;
                message = `Ready to call us at ${value}?`;
                break;
            case 'address':
                action = `https://maps.google.com/?q=${encodeURIComponent(value)}`;
                message = `Want to get directions to our location?`;
                break;
            default:
                return;
        }

        Swal.fire({
            title: title,
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1a4137',
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, ${type === 'email' ? 'Send Email' : type === 'phone' ? 'Call Now' : 'Get Directions'}`,
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(action, '_self');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 mt-16">
            {/* Hero Section - More Compact */}
            <section className="relative py-16 bg-gradient-to-r from-[#1a4137] to-[#2a5c4f] text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-sm mb-6 border border-white/30">
                        <FaHeadset className="text-3xl text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Get in touch with our team for any questions about books, borrowing, or general inquiries.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Information Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#1a4137] to-[#2a5c4f] rounded-xl flex items-center justify-center">
                                    <FaBook className="text-white text-lg" />
                                </div>
                                Contact Info
                            </h2>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: FaEnvelope,
                                        title: "Email Us",
                                        details: ["support@bookzone.com"],
                                        subtitle: "We reply within 2 hours",
                                        color: "from-purple-500 to-blue-500",
                                        type: "email",
                                        value: "support@bookzone.com"
                                    },
                                    {
                                        icon: FaPhone,
                                        title: "Call Us",
                                        details: ["+1 (555) 123-4567"],
                                        subtitle: "Mon-Fri from 9am to 6pm",
                                        color: "from-green-500 to-emerald-500",
                                        type: "phone",
                                        value: "+15551234567"
                                    },
                                    {
                                        icon: FaMapMarkerAlt,
                                        title: "Visit Us",
                                        details: ["123 Book Street", "Library City"],
                                        subtitle: "Come say hello",
                                        color: "from-orange-500 to-red-500",
                                        type: "address",
                                        value: "123 Book Street, Library City"
                                    },
                                    {
                                        icon: FaClock,
                                        title: "Working Hours",
                                        details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
                                        subtitle: "Sunday: Closed",
                                        color: "from-blue-500 to-indigo-500"
                                    }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer"
                                        onClick={() => item.type && handleContactClick(item.type, item.value, item.title)}
                                    >
                                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <item.icon className="text-white text-base" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 text-base mb-1">{item.title}</h3>
                                            {item.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                                            ))}
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <FaRegSmile className="text-yellow-500" />
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Help Card */}
                        <div className="bg-gradient-to-br from-[#1a4137] to-[#2a5c4f] rounded-2xl shadow-xl p-6 text-white">
                            <h3 className="text-lg font-bold mb-4 text-center">Need Quick Help?</h3>
                            <p className="text-sm text-white/80 text-center mb-4">
                                Get instant support from our team
                            </p>
                            <button
                                onClick={handleInstantHelp}
                                className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 flex items-center justify-center gap-2"
                            >
                                <FaHeadset className="text-lg" />
                                Get Instant Help
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">Send Us a Message</h2>
                                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                                    Have questions? We'd love to hear from you. Fill out the form below.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1a4137] focus:ring-2 focus:ring-[#1a4137]/20 transition-all duration-300 placeholder-gray-400"
                                            placeholder="Your first name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1a4137] focus:ring-2 focus:ring-[#1a4137]/20 transition-all duration-300 placeholder-gray-400"
                                            placeholder="Your last name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1a4137] focus:ring-2 focus:ring-[#1a4137]/20 transition-all duration-300 placeholder-gray-400"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1a4137] focus:ring-2 focus:ring-[#1a4137]/20 transition-all duration-300 bg-white"
                                    >
                                        <option value="">What can we help you with?</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Book Donation">Book Donation</option>
                                        <option value="Borrowing Issue">Borrowing Issue</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Book Request">Book Request</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#1a4137] focus:ring-2 focus:ring-[#1a4137]/20 transition-all duration-300 resize-none placeholder-gray-400"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                                    <FaShieldAlt className="text-xl text-blue-600 flex-shrink-0" />
                                    <p className="text-xs text-blue-700">
                                        <strong>Your privacy is important to us.</strong> We'll never share your information with third parties.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-[#1a4137] to-[#2a5c4f] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#2a5c4f] hover:to-[#1a4137] transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-base" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;