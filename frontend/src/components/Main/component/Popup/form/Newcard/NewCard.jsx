import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({ name: "", link: "" });

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
      setErrors({ name: "", link: "" });
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    setErrors({ ...errors, name: e.target.validationMessage });
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setErrors({ ...errors, link: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onAddPlaceSubmit({ name, link });
      setName("");
      setLink("");
    }
  }

  const isValid = name && link && !errors.name && !errors.link;

  return (
    <PopupWithForm
      name="add-place"
      title="Nuevo lugar"
      buttonText="Crear"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="place-input"
        type="text"
        name="name"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error place-input-error">{errors.name}</span>

      <input
        className="popup__input"
        id="link-input"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error link-input-error">{errors.link}</span>

    </PopupWithForm>
  );
}

export default NewCard;
