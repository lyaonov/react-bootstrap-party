import proffessions from '../mockData/professions.json';
import qualities from '../mockData/qualities.json';
import users from '../mockData/users.json';
import httpService from '../services/http.service';
import { useEffect, useState } from 'react';
const STATUS_CONSTS = {
    idle: 'Not Started',
    pending: 'In Process',
    error: 'Error occured',
    successed: 'Ready',
}

const useMockData = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(STATUS_CONSTS.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);

    const summary = proffessions.length + qualities.length + users.length;

    const incCount = () => {
        setCount((prev) => prev + 1 );
    }

    const updateProgress = () => {
        if (count !== 0 && (status === STATUS_CONSTS.idle || status === STATUS_CONSTS.successed)) {
            setStatus(STATUS_CONSTS.pending)
        }

        const newProgress = Math.floor((count / summary) * 100); 

        if (progress < newProgress) {
            setProgress(() => newProgress)
        }

        if (newProgress === 100) {
            setStatus(STATUS_CONSTS.successed)
        }
    }

    useEffect(() => {
        updateProgress();
    }, [count])

    const initialize = async () => {
        setProgress(0)
        setCount(0)

        try {
            proffessions.forEach(async (prof) => {
                await httpService.put("profession/" + prof._id, prof);
                incCount();
            })
            users.forEach(async (user) => {
                await httpService.put("user/" + user._id, user);
                incCount();
            })
            qualities.forEach(async (qual) => {
                await httpService.put("quality/" + qual._id, qual);
                incCount();
            })
        } catch (error) {
            setError(error)
            setStatus(STATUS_CONSTS.error)
        }

    };

    return { error, initialize, progress, status };
}

export default useMockData;