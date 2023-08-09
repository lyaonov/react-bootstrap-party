import React, { useCallback } from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();

    const handleClick = useCallback(() => {
        initialize();
    }, [])

    return <div className="container mt-5">
        <h1> Main Page</h1>
        <h3>Инициализация данных</h3>
        <ul>
            <li>Status: {status}</li>
            <li>Progress: {progress}%</li>
            {error ? <li>Error: {error}</li> : null}
        </ul>
        <button disabled={status === 'In Process' } className="btn btn-primary" onClick={handleClick}>Инициализировать</button>
    </div>;
};

export default Main;
