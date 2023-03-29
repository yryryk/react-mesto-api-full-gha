import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup(props) {

  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(values);
  }

  useEffect(() => {
    if(!props.isOpen) {
      setValues({
        name: '',
        link: '',
      });
    }
  }, [props.isOpen, setValues]);

  return (
    <PopupWithForm name='element' title='Новое место' buttonText='Создать' {...props}  onSubmit={handleSubmit}>
    <label className="popup__field">
      <input id="text-input" type="text" name="name" className="input" onChange={handleChange} value={values.name||''} placeholder="Название" minLength="2" maxLength="30" required />
      <span className="text-input-error popup__input-error"></span>
    </label>
    <label className="popup__field">
      <input id="link-input" name="link" className="input" onChange={handleChange} value={values.link||''} placeholder="Ссылка на картинку" type="url" required />
      <span className="link-input-error popup__input-error"></span>
    </label>
  </PopupWithForm>
  );
}

export default AddPlacePopup;
