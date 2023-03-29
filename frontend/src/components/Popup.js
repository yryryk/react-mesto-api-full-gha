function Popup(props) {

  function handleOverlayClose (evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose()
    }
  }

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen&&'popup_open'}`} id={`popup-${props.name}`} onClick={handleOverlayClose}>
      <div className="popup__window">
        <button aria-label="кнопка закрытия" type="button" className="button-opacity popup__close-button" onClick={props.onClose}></button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
