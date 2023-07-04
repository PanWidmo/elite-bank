import { AuthContextProvider } from '@/context/AuthContext.jsx';
import { DatabaseContextProvider } from '@/context/DatabaseContext.jsx';
import PropTypes from 'prop-types';

export const AppProviders = ({ children }) => {
    return (
        <AuthContextProvider>
            <DatabaseContextProvider>{children}</DatabaseContextProvider>
        </AuthContextProvider>
    );
};

AppProviders.propTypes = {
    children: PropTypes.any,
};
