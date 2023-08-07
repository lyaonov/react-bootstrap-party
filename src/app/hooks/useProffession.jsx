import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import proffessionService from '../services/proffessions.service'; 
import { toast } from 'react-toastify';

const ProffessionContext = React.createContext();

export const useProffession = () => {
    return useContext(ProffessionContext);
};

export const ProffessionProvider = ({ children }) => {
    const [proffessions, setProffessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const errorCatcher = (err) => {
        const { message } = err.response.data;
        setError(message);
        setIsLoading(false);
    }

    const getProffessionsList = async () => {
        try {
            const { content } = await proffessionService.get()
            setProffessions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getProffession = (id) => {
        return proffessions.find((p) => p._id === id);
    };

    useEffect(() => {
        getProffessionsList();
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null)
        }
    }, [error])

    return (
        <ProffessionContext.Provider value={{proffessions, isLoading, getProffession}}>
            {children}
        </ProffessionContext.Provider>
    );
}

ProffessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
 
