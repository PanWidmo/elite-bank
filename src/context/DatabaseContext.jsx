import { createContext, useEffect, useState } from 'react';
import { database } from '@/services/firebase/firebase.jsx';
import { ref, set, onValue } from 'firebase/database';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth.jsx';

export const DatabaseContext = createContext();

export const DatabaseContextProvider = ({ children }) => {
    const db = database;
    const [userData, setUserData] = useState({});
    const { currentUser } = useAuth();

    const addUserToDb = (userId, { name, email, age }) => {
        set(ref(db, `users/${userId}`), {
            name,
            email,
            age,
        });
    };

    useEffect(() => {
        if (!currentUser?.uid) return;

        const unsubscribe = onValue(ref(db, `users/${currentUser.uid}`), (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        });

        return () => unsubscribe();
    }, [currentUser, db]);

    const values = {
        addUserToDb,
        userData,
    };

    return <DatabaseContext.Provider value={values}>{children}</DatabaseContext.Provider>;
};

DatabaseContextProvider.propTypes = {
    children: PropTypes.any,
};
