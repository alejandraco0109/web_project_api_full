import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      
      <div className="popup__container">
        
        <button
          className="popup__button_close"
          type="button"
          onClick={onClose}
        />

        <h2 className="popup__title">{title}</h2>

        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}

          <button className="popup__button" type="submit">
            {buttonText}
          </button>

        </form>
      </div>

    </section>
  );
}

export default PopupWithForm;