import Popup from './Popup';

function PopupWithForm(props) {
  return (
    <Popup {...props}>
      <h2 className="popup__title">{props.title}</h2>
      <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
        {props.children}
        <button aria-label="кнопка сохранить" type="submit" className="popup__submit-button">{props.buttonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
