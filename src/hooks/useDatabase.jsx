import { useContext } from 'react';
import { DatabaseContext } from '@/context/DatabaseContext.jsx';

export const useDatabase = () => {
    return useContext(DatabaseContext);
};
