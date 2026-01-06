import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const axiosSecure = useAxiosSecure(user);
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password
        )
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const googleProvider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser)
            console.log(currentUser);
            if (currentUser) {
                const userInfo = {
                    name: currentUser.displayName,
                    email: currentUser.email
                };
                try {
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo)
                    const res = await axiosSecure.get(`/users/admin/${currentUser.email}`);
                    setIsAdmin(res.data.admin);
                } catch (error) {
                    console.error("Admin check failed", error);

                }
            }
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, []);

    const authInfo = {
        loading,
        user,
        isAdmin,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn,
        updateUser,

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;