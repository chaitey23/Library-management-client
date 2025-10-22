import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import { Link } from 'react-router';

const FeaturedReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const tempReviews = [
            {
                _id: 1,
                userName: "Sarah Johnson",
                rating: 5,
                comment: "The book collection is amazing! Found all my favorite authors in one place. The borrowing system is so convenient!",
                bookName: "The Great Gatsby",
                createdAt: new Date()
            },
            {
                _id: 2,
                userName: "Mike Chen",
                rating: 4,
                comment: "Easy borrowing system and great customer support. The library app makes it so simple to manage my readings!",
                bookName: "To Kill a Mockingbird",
                createdAt: new Date()
            },
            {
                _id: 3,
                userName: "Emily Davis",
                rating: 5,
                comment: "My students love the children's section. Wonderful resource for education and the staff is incredibly helpful!",
                bookName: "Harry Potter Series",
                createdAt: new Date()
            },
            {
                _id: 4,
                userName: "Alex Rodriguez",
                rating: 5,
                comment: "Best library in town! The digital catalog and reservation system saved me so much time. Highly recommended!",
                bookName: "1984",
                createdAt: new Date()
            },
            {
                _id: 5,
                userName: "Priya Sharma",
                rating: 4,
                comment: "Great variety of books across all genres. The community events are fantastic for book lovers!",
                bookName: "The Alchemist",
                createdAt: new Date()
            },
            {
                _id: 6,
                userName: "David Wilson",
                rating: 5,
                comment: "Impressed with the modern facilities and friendly staff. The online renewal system works perfectly!",
                bookName: "The Da Vinci Code",
                createdAt: new Date()
            }
        ];

        setReviews(tempReviews);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-[#1a4137] to-[#2a5c4f]">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center py-16">
                        <div className="loading loading-spinner text-[#c6d936] w-12 h-12"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-[#1a4137] to-[#2a5c4f] text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">What Readers Are Saying</h2>
                    <p className="text-gray-200 max-w-2xl mx-auto text-lg">
                        Real reviews from our community of book lovers and library members
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group hover:transform hover:scale-105"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <Quote className="w-8 h-8 text-[#c6d936] transform group-hover:scale-110 transition-transform" />
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-100 mb-6 leading-relaxed text-sm line-clamp-4">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#c6d936] rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-[#1a4137]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-sm">{review.userName}</h4>
                                        <p className="text-gray-300 text-xs">on {review.bookName}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link to="/all-books">
                        <button className="bg-[#c6d936] text-[#1a4137] px-8 py-3 rounded-lg hover:bg-[#b0c42d] transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                            Join Our Reading Community
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedReviews;