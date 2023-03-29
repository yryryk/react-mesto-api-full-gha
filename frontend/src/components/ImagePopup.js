function ImagePopup(props) {

  function handleOverlayClose (evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose()
    }
  }

  return (
    <div className={`popup popup_type_image popup_make-color_dark ${props.card.link&&'popup_open'}`} id="popup-image" onClick={handleOverlayClose}>
      <div className="popup__image-window">
        <button aria-label="кнопка закрытия" type="button" className="button-opacity popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__image-title">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
