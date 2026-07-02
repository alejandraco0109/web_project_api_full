import React, { useEffect } from "react";

function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={name === "image" ? "popup__image-wrapper" : "popup__content"}>
        {isOpen && (
  <button
    className="popup__close"
    type="button"
    onClick={onClose}
    aria-label="Cerrar"
  />
)}
        {children}
      </div>
    </div>
  );
}

export default Popup;

