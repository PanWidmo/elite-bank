import { useState, useEffect, createContext } from 'react';
import { auth } from '@/services/firebase/firebase.jsx';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const values = {
        currentUser,
        signIn,
        createUser,
        logout,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
    children: PropTypes.any,
};
