import PropTypes from "prop-types";
import React, { useState, useCallback, useMemo } from 'react';

import { useHistory } from "react-router-dom";


const UserCard = ({ name, proffession, rate }) => {
    const [openSetting, setOpenSetting] = useState(false);

    const toggleSetting = useCallback(() => {
        setOpenSetting(!openSetting);
    }, [openSetting])

    const history = useHistory();

    const handleClick = (edit = false) => {
        edit ? history.push(history.location.pathname + "/edit") : history.push("/users");
    };

    const pic = useMemo(() => {
        return `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
        )
            .toString(36)
            .substring(7)}.svg`
    }, [])
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={toggleSetting}>
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={pic}
                        className="rounded-circle"
                        width="150"
                        height="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{proffession}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                            <i className="bi bi-caret-up text-secondary" role="button"></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        {openSetting && <button type="button" className="btn btn-outline-primary m-2" onClick={() => handleClick(true)}>Редактировать</button>}
                        <button type="button" className="btn btn-outline-success m-2" onClick={() => handleClick()}>Все пользователи</button>
                    </div>



                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    name: PropTypes.string,
    proffession: PropTypes.string,
    rate: PropTypes.number,
};

export default UserCard;