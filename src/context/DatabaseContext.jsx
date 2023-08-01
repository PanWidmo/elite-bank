import { createContext, useEffect, useState } from 'react';
import { database } from '@/services/firebase/firebase.jsx';
import { ref, set, onValue, get, runTransaction, remove } from 'firebase/database';
import PropTypes from 'prop-types';
import { useAuth } from '@/hooks/useAuth.jsx';
import { ErrorPopup } from '@/components/ErrorPopup/ErrorPopup.jsx';

export const DatabaseContext = createContext();

export const DatabaseContextProvider = ({ children }) => {
    const db = database;
    const [userData, setUserData] = useState({});
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    const addUserToDb = (userId, { name, email, age, pin }) => {
        // Every new user receives extra 1000 euro by opening an account
        const movements = [1000];

        try {
            set(ref(db, `users/${userId}`), {
                id: userId,
                name,
                email,
                age,
                pin,
                movements,
            });
        } catch ({ message }) {
            setError(message);
        }
    };

    const userBalance = userData?.movements?.reduce((acc, curr) => acc + curr) || 0;

    const getUserByEmail = async (email) => {
        try {
            const usersRef = ref(db, 'users');
            const snapshot = await get(usersRef);
            const usersData = snapshot.val();
            const user = Object.values(usersData).find((obj) => obj.email === email);

            if (!user) {
                throw new Error("User doesn't exist");
            }

            return user;
        } catch ({ message }) {
            setError(message);
        }
    };

    const addMovementToUser = async (userId, newMovement) => {
        try {
            const userMovementsRef = ref(db, `users/${userId}/movements`);

            const transactionResult = await runTransaction(userMovementsRef, (currentMovements) => {
                if (!currentMovements) {
                    return [newMovement];
                } else {
                    return [...currentMovements, newMovement];
                }
            });

            return transactionResult.snapshot.val();
        } catch ({ message }) {
            setError(message);
        }
    };

    const transferMoney = async (email, amount) => {
        try {
            const user = await getUserByEmail(email);

            await Promise.all([addMovementToUser(user.id, amount), addMovementToUser(currentUser.uid, -amount)]);
        } catch ({ message }) {
            setError(message);
        }
    };

    const requestLoan = async (amount) => {
        try {
            await addMovementToUser(currentUser.uid, amount);
        } catch ({ message }) {
            setError(message);
        }
    };

    const wipeAccount = async (email) => {
        try {
            const user = await getUserByEmail(email);
            const userMovementsRef = ref(db, `users/${user.id}/movements`);

            await remove(userMovementsRef);
        } catch ({ message }) {
            setError(message);
        }
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
        userBalance,
        transferMoney,
        requestLoan,
        wipeAccount,
    };

    return (
        <DatabaseContext.Provider value={values}>
            {children}
            {error && <ErrorPopup msg={error} />}
        </DatabaseContext.Provider>
    );
};

DatabaseContextProvider.propTypes = {
    children: PropTypes.any,
};
