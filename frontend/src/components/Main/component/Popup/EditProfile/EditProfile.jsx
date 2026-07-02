import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "../form/Newcard/PopupWithForm.jsx";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext.js";
  
  function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });

  useEffect(() => {
  if (isOpen && currentUser) {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setErrors({ name: "", description: "" });
  }
}, [isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    setErrors({ ...errors, name: e.target.validationMessage });
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setErrors({ ...errors, description: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser({ name, about: description });
    }
  }

  const isValid = name && description && !errors.name && !errors.description;
  
  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name"
        name="name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        required
        type="text"
      />

      <span className="popup__error popup__input_name-error popup__error_hidden"></span>

      <input
        className="popup__input popup__input_about"
        name="description"
        placeholder="Acerca de mí"
        minLength="2"
        maxLength="200"
        required
        type="text"
      />

      <span className="popup__error popup__input_about-error popup__error_hidden"></span>

      <button className="button popup__button_save" type="submit">
        Guardar
      </button>
    </PopupWithForm>
  );
}

export default EditProfile;