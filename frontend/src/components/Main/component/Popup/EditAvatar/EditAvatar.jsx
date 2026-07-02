export default function EditAvatar() {
  return (
    <form className="popup__form" id="edit-avatar-form">
      <h3 className="popup__title">Cambiar foto de perfil</h3>

      <input
        className="popup__input"
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        type="url"
      />

      <button className="button popup__button_save" type="submit">
        Guardar
      </button>
    </form>
  );
}