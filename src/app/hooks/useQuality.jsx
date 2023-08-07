import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service';
import { toast } from 'react-toastify';

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualitys, setQualitys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const errorCatcher = (err) => {
        const { message } = err.response.data;
        setError(message);
        setIsLoading(false);
    }

    const getQualitysList = async () => {
        try {
            const { content } = await qualityService.get()

            setQualitys(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getQuality = (id) => {
        return qualitys.filter((qual) => id.includes(qual._id ));
    };

    useEffect(() => {
        getQualitysList();
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null)
        }
    }, [error])

    return (
        <QualityContext.Provider value={{qualitys, isLoading, getQuality, getQualitysList}}>
            {children}
        </QualityContext.Provider>
    );
}

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
 
