import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { useContext} from 'react';

function Main(props) {
  const {onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete} = props.handlers;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <button onClick={onEditAvatar} aria-label="кнопка добавить" type="button" className="profile__user-picture" style={{ backgroundImage: `url(${currentUser.avatar})` }}><div className="profile__user-pen-editing"></div></button>
          <div className="profile__user-info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={onEditProfile} aria-label="кнопка редактировать" type="button" className="button-opacity profile__edit-button"></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} aria-label="кнопка добавить" type="button" className="button-opacity profile__add-button"></button>
      </section>

      <section className="elements" aria-label="Секция с картинками">
        {props.cards[0]&&props.cards.map((card) => (
          <Card card ={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
        )).reverse()}
      </section>
    </main>
  );
}

export default Main;
