import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"; 


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  function handleLogin(email, password) {
  auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        api.setToken(data.token);
        setEmail(email);        
        setIsLoggedIn(true);
        navigate("/");
      }
    })
    .catch((err) => {
      console.error(err);
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    });
}

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsSuccess(true);
        navigate("/signin");
      })
      .catch(() => setIsSuccess(false))
      .finally(() => setIsInfoTooltipOpen(true));
  }

function handleSignOut() {
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  setEmail("");
  api.setToken(null);
  navigate("/signin");
}

useEffect(() => {
  const jwt = localStorage.getItem("jwt");
  
  if (jwt) {
    auth.checkToken(jwt)
      .then((res) => {
        if (res && res.data) {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          api.setToken(jwt); 
          navigate("/"); 
        } else {
          localStorage.removeItem("jwt");
        }
      })
      .catch((err) => {
        console.error("Error al validar token:", err);
        localStorage.removeItem("jwt");
      });
  }
}, []);

useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(userData) {
  api.setUserInfo(userData)
    .then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}

  function handleUpdateAvatar(avatarData) {
    api.setUserAvatar(avatarData)
      .then((newUser) => {

        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error al actualizar avatar: ${err}`));
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then((newCard) => {

        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => console.error(`Error al añadir tarjeta: ${err}`));
  }

function handleCardLike(card) {
  api.changeLikeStatus(card._id, !card.isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    })
    .catch((err) => console.error(`Error al gestionar el like: ${err}`));
}

function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {

        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(`Error al eliminar la tarjeta: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={email} onSignOut={handleSignOut} />

        <Routes>
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Main

          cards={cards} 
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        onClosePopup={closeAllPopups}
        
        onUpdateUser={handleUpdateUser} 
        onUpdateAvatar={handleUpdateAvatar}
        onAddPlaceSubmit={handleAddPlaceSubmit}

        popup={
          isEditProfilePopupOpen ? "edit-profile" : 
          isAddPlacePopupOpen ? "add-place" : 
          isEditAvatarPopupOpen ? "edit-avatar" : null
        }
        selectedCard={selectedCard}
        />
            </ProtectedRoute>
          } />

          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
        </Routes>
{isLoggedIn && <Footer />}

        <InfoTooltip 
          isOpen={isInfoTooltipOpen} 
          isSuccess={isSuccess} 
          onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;