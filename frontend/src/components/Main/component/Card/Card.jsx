import React, { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.js";



function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = (card.owner?._id || card.owner) === currentUser?._id;

  const isLiked = card.likes?.some(
  (user) => user._id === currentUser?._id || user === currentUser?._id
);

  const cardDeleteButtonClassName = `card__delete ${isOwn ? "" : "card__delete_hidden"}`;
  const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_is-active" : ""}`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

function handleImageClick() {
  onCardClick(card);
}

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <span className="card__like-count">{card.likes?.length || 0}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;