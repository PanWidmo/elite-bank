import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { auth } from '@/firebase/firebase.jsx';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const effectCalled = useRef(false);

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    useEffect(() => {
        if (!effectCalled.current) {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
            });

            return () => {
                unsubscribe();
                effectCalled.current = true;
            };
        }
    }, [currentUser]);

    const value = {
        currentUser,
        signIn,
        createUser,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => useContext(UserContext);
