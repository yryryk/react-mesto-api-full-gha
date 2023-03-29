import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext} from 'react';

function Card(props) {
  const card = props.card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id||card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked && 'elements__like-button_active'}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <div className="elements__photo">
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="elements__paraphernalia">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button aria-label="поставить лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="elements__like-value">{card.likes.length}</span>
        </div>
        {isOwn && <button aria-label="кнопка удаления" type="button" className="button-opacity elements__delete-button"  onClick={handleDeleteClick} />}
      </div>
    </div>
  );
}

export default Card;
