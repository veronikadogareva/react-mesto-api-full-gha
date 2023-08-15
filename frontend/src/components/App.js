import React, {useState} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import { api } from '../utils/api';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import { register, authorize, getContent } from '../utils/auth';
import InfoTooltip from './InfoTooltip';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [massageError, setMassageError] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoTooltipOpen;
  const navigate = useNavigate();
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])
  React.useEffect(() => {
    tokenCheck();
  }, []);
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch(console.error);
      api.getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch(console.error);
    }
  }, [loggedIn]);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoTooltipOpen(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    } else {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    }
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.patchUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.patchUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleRegister({ email, password }) {
    register({ email, password })
      .then(() => {
        setMassageError(false);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setMassageError(true);
      });
  }
  function handleLogin({ email, password }) {
    authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setMassageError(true);
      });
  }
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      getContent(token)
        .then(user => {
          setEmail(user.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(console.error);
    } else {
      setLoggedIn(false);
      navigate('/sign-in');
    }
  }
  function handleExit() {
    localStorage.removeItem('token');
    tokenCheck();
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <AppContext.Provider value={{ isLoading, closeAllPopups }}>
          <Header src={logo} alt='Логотип сайта Место' loggedIn={loggedIn} email={email} handleExit={handleExit} />
          <Routes>
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
            <Route path="/"
              element={<ProtectedRoute element={Main} loggedIn={loggedIn} cards={cards} onAvatarClick={handleEditAvatarClick} onProfileClick={handleEditProfileClick} onNewCardClick={handleAddPlaceClick} onCardClick={handleCardClick}
                onCardLike={handleCardLike} onCardDelete={handleCardDelete} />} />
          </Routes>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm name='delete'  onClose={closeAllPopups} title='Вы уверены?'  textButton="Да"  />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} massageError={massageError} />
        </AppContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
// 2) сделать overlay для всех попапов
// 7) сделать мобильную версию для новых штук
// 8) сделать подтверждение удаления карточки
// 10)сделать так, чтобы при открытии не возникало логин