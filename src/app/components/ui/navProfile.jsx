import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { currentUser } = useAuth();
    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">
                    {currentUser.name}
                </div>
                <img src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`} height='40' alt="" className="img-responsive rounded-circle" />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? 'show': '')}>
                <Link className='dropdown-item' to={`users/${currentUser._id}`}>Profile</Link>
                <Link to={`logout}`} className='dropdown-item'>Logout</Link>

            </div>
        </div>
    );
}

export default NavProfile;