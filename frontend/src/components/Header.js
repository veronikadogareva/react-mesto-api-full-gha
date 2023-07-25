import React from 'react';
import { Link, useLocation } from 'react-router-dom';
function Header({ src, alt, loggedIn, email, handleExit }) {
    const location = useLocation();
    function handleButton() {
        handleExit();
    }
    return (
        <header className="header">
            <img className="header__logo" src={src} alt={alt} />
            <div className="header__container">
                {loggedIn ? (<>
                    <p className="header__email">{email}</p>
                    <Link to="/sign-in" className="header__link" onClick={handleButton}>Выйти</Link>
                </>) : (location.pathname === '/sign-in' ? (<Link to="/sign-up" className="header__link">Регистрация</Link>) : (<Link to="/sign-in" className="header__link">Войти</Link>))}
            </div>

        </header>
    )
}
export default Header;