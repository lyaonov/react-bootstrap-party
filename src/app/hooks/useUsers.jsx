import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import userService from '../services/user.service';
import { toast } from 'react-toastify';

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const errorCatcher = (err) => {
        const { message } = err.response.data;
        setError(message);
        setIsLoading(false);
    }

    const getUsers = async () => {
        try {
            const { content } = await userService.get()

            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null)
        }
    }, [error])

    return (
        <UserContext.Provider value={{users}}>
            {isLoading ? 'loading...' : children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UserProvider;

