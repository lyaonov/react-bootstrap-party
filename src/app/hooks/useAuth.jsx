import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../services/localStorage.service';


export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    },
})

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);

    const errorCatcher = (err) => {
        const { message } = err.response.data;
        setError(message);
    }

    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, { email, password, returnSecureToken: true });
            setTokens(data);
            getUserData()
        } catch (error) {
            errorCatcher(error);

            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    throw new Error('Неверный логин или пароль');
                }
                if (message.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
                    throw new Error('Слишком много попыток входа, попробуйте позже');
                }
            }
        }
    }

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ _id: data.localId, email, rate: randomNumber(1, 5), completedMeetings: randomNumber(0, 200), ...rest })
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errObject = { email: "Пользователь с таким email уже существует" }
                    throw errObject;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        }

    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null)
        }
    }, [error])

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content)
            console.log(content)
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    );

}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider;