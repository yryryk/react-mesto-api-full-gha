import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditProfilePopup(props) {

  const {values, handleChange, setValues} = useForm({
    name: '',
    about: '',
  });
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, props.isOpen, setValues]);

  useEffect(() => {
    if(!props.isOpen) {
      setValues({
        name: '',
        about: '',
      });
    }
  }, [props.isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(values);
  }

  return (
  <PopupWithForm name='profile' title='Редактировать профиль' buttonText='Сохранить' {...props}  onSubmit={handleSubmit}>
    <label className="popup__field">
      <input id="title-input" type="text" name="name" className="input" placeholder="Имя" onChange={handleChange} value={values.name||''} minLength="2" maxLength="40" required />
      <span className="title-input-error popup__input-error"></span>
    </label>
    <label className="popup__field">
      <input id="subtitle-input" type="text" name="about" className="input" placeholder="Описание" onChange={handleChange} value={values.about||''} minLength="2" maxLength="200" required />
      <span className="subtitle-input-error popup__input-error"></span>
    </label>
  </PopupWithForm>
  );
}

export default EditProfilePopup;
