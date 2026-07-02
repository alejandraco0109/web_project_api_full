import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }


  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  const isLoggedIn = !!userEmail;

  return (
    <header className={`header ${isMenuOpen ? "header_opened" : ""}`}>
      
      {isLoggedIn && (
        <div className={`header__user-info ${isMenuOpen ? "header__user-info_visible" : ""}`}>
          <span className="header__user-email">{userEmail}</span>
          <button onClick={handleSignOut} className="header__link header__button header__button_type_logout">
            Cerrar sesión
          </button>
        </div>
      )}

      <div className="header__main-container">
        <img src={logo} alt="Around the U.S logo" className="logo header__logo" />
        
        
        {!isLoggedIn && (
          <div className="header__container">
            {location.pathname === "/signin" && (
              <Link to="/signup" className="header__link">Regístrate</Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/signin" className="header__link">Iniciar sesión</Link>
            )}
          </div>
        )}

        
        {isLoggedIn && (
          <>
            
            <div className="header__container header__container_desktop">
              <span className="header__user-email">{userEmail}</span>
              <button onClick={onSignOut} className="header__link header__button">
                Cerrar sesión
              </button>
            </div>

           
            <button 
              className={`header__menu-button ${isMenuOpen ? "header__menu-button_type_close" : ""}`} 
              onClick={toggleMenu}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;