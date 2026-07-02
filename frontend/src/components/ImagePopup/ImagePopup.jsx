import React from "react";

export default function ImagePopup({ card, onClose }) {
  if (!card) {
    return null;
  }
  return (
    <div className="popup popup_type_image">
      <div className="popup__image-wrapper">
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />

        <p className="popup__paragraph">{card.name}</p>
      </div>
    </div>
  );
}
