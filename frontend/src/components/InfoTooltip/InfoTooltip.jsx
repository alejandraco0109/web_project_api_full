import React from 'react';
import successIcon from '../../images/success-icon.svg'; 
import errorIcon from '../../images/error-icon.svg'; 

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
  <div className="popup__container popup__container_type_tooltip">
    <button
      type="button"
      className="popup__close popup__close_type_tooltip" 
      onClick={onClose}
    ></button>
    
    <img 
      src={isSuccess ? successIcon : errorIcon} 
      className="popup__tooltip-icon" 
      alt="icon"
    />
    
    <h2 className="popup__title popup__title_type_tooltip">
      {isSuccess 
        ? "¡Correcto! Ya estás registrado." 
        : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
    </h2>
  </div>
</div>
  );
}

export default InfoTooltip;