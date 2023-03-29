import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {Route, Routes, Navigate, useNavigate, Link} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    email: 'Загружаем',
    avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    name: 'Скоро будет',
    about: 'Ну скоро'
});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [successAuth, setSuccessAuth] = useState({
    message: '',
    selector: '',
  });
  const [waitingLoad, setWaitingLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      auth.checkToken(jwt)
      .then((result) => {
        api.setToken(jwt);
        setLoggedIn(true);
        navigate("/");
        return result
      })
      .then((result) => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([resultInfo, resultCards]) => {
          setCurrentUser(resultInfo.data);
          setCards(resultCards.data);
        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setWaitingLoad(false);
      })

    }else{
      setWaitingLoad(false);
    }

  },[navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) =>[...state.filter((c) => c._id !== card._id)]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(inputValuesUser) {
    api.setUserInfo(inputValuesUser)
    .then((result) => {
      setCurrentUser(result.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(inputValuesAvatar) {
    api.setUserAvatar(inputValuesAvatar)
    .then((result) => {
      setCurrentUser(result.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlace(inputValuesPlace) {
    api.setCard(inputValuesPlace)
    .then((newCard) => {
      setCards([...cards, newCard.data]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[]);

  const handleLogin = (inputValues) => {
    auth.signInUser(inputValues)
    .then((result) => {
      localStorage.setItem('JWT', result.token);
      api.setToken(result.token);
      setLoggedIn(true);
      navigate("/");
    })
    .catch((err) => {
      setSuccessAuth({
        message: `Что-то пошло не так! Попробуйте ещё раз. ${err}`,
        selector: 'popup__auth-image_type_nope',
      });
      setIsInfoTooltipPopupOpen(true);
      console.log(err);
    });
  }

  const handleRegister = (inputValues) => {
    auth.signUpUser(inputValues)
    .then(() => {
      setSuccessAuth({
        message: 'Вы успешно зарегистрировались!',
        selector: 'popup__auth-image_type_yep',
      });
      setIsInfoTooltipPopupOpen(true);
      navigate("/signin");
    })
    .catch((err) => {
      setSuccessAuth({
        message: `Что-то пошло не так! Попробуйте ещё раз. ${err}`,
        selector: 'popup__auth-image_type_nope',
      });
      setIsInfoTooltipPopupOpen(true);
      console.log(err);
    });
  }

  function onSignOut() {
    localStorage.removeItem('JWT');
    setCurrentUser({
      email: 'Загружаем',
      avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      name: 'Скоро будет',
      about: 'Ну скоро'
  });
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Routes>
        <Route path="/" element={<Header />}>

          <Route index element={
            <Link to="/signin" className="auth-forms__link" onClick={onSignOut}>
              <p className="auth-forms__email">{currentUser.email}</p>
              <p className="auth-forms__email">Выйти</p>
            </Link>
          } />
          <Route path="signin" element={
            <Link to="/signup" className="auth-forms__link">
              Зарегистрироваться
            </Link>
          } />
          <Route path="signup" element={
            <Link to="/signin" className="auth-forms__link">
              Войти
            </Link>
          } />

        </Route>
      </Routes>

      <Routes>
        <Route path="/" element={!waitingLoad&&<ProtectedRoute
          component={Main}
          loggedIn={loggedIn}
          handlers={{
            onEditProfile: handleEditProfileClick,
            onAddPlace: handleAddPlaceClick,
            onEditAvatar: handleEditAvatarClick,
            onCardClick: handleCardClick,
            onCardLike: handleCardLike,
            onCardDelete: handleCardDelete
          }}
          cards={cards}
          />}
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}/>
      </Routes>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} success={successAuth} />

    </CurrentUserContext.Provider>
  );
}

export default App;
