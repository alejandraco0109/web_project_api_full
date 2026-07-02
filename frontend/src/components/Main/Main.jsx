import { useState, useContext } from "react";
import Card from "./component/Card/Card.jsx";
import Popup from "./component/Popup/Popup.jsx";
import NewCard from "./component/Popup/form/Newcard/NewCard.jsx";
import EditProfile from "./component/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./component/Popup/EditAvatar/EditAvatar.jsx";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main({
  cards,
  onUpdateUser,
  onUpdateAvatar,
  onAddPlaceSubmit,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);

  const [isNewCardPopupOpen, setIsNewCardPopupOpen] =
    useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <main className="main">

      <section className="main__profile">

        <div
          className="main__content-image"
          onClick={() => setIsEditAvatarPopupOpen(true)}
        >
          <img
            src={currentUser?.avatar}
            alt="Avatar"
            className="main__profile-image"
          />

          <div className="main__profile-edit-icon"></div>
        </div>

        <div className="main__content-paragraph">

          <h1 className="main__paragraph main__paragraph_name">
            {currentUser?.name}
          </h1>

          <button
            className="main__button main__button_edit"
            type="button"
            onClick={() => setIsEditProfilePopupOpen(true)}
          >
             🖌
          </button>

          <p className="main__paragraph main__paragraph_about">
            {currentUser?.about}
          </p>

        </div>

        <button
          className="main__button main__button_add"
          type="button"
          onClick={() => setIsNewCardPopupOpen(true)}
        >
        🞣  
        </button>

      </section>

      <section className="main__gallery">

  <ul className="main__gallery-list">

    {cards &&
      cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))}

  </ul>

</section>

      <Popup
        isOpen={isEditProfilePopupOpen}
        name="edit-profile"
        onClose={closeAllPopups}
      >
        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={onUpdateUser}
          onClose={closeAllPopups}
        />
      </Popup>

      <Popup
        isOpen={isEditAvatarPopupOpen}
        name="edit-avatar"
        onClose={closeAllPopups}
      >
        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={onUpdateAvatar}
          onClose={closeAllPopups}
        />
      </Popup>

      <Popup
        isOpen={isNewCardPopupOpen}
        name="new-card"
        onClose={closeAllPopups}
      >
        <NewCard
          isOpen={isNewCardPopupOpen}
          onAddPlaceSubmit={onAddPlaceSubmit}
          onClose={closeAllPopups}
        />
      </Popup>

      <Popup
        isOpen={!!selectedCard}
        name="image"
        onClose={closeAllPopups}
      >
        <ImagePopup card={selectedCard} />
      </Popup>

    </main>
  );
}

export default Main;