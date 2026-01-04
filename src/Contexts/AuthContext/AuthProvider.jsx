import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    console.log("BASE URL:", import.meta.env.VITE_BASE_URL);

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
            // setLoading(false)
            console.log(currentUser);
            if (currentUser) {
                const userInfo = {
                    name: currentUser.displayName,
                    email: currentUser.email
                };
                try {
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userInfo)
                } catch (error) {
                    console.error("User save failed", error);

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