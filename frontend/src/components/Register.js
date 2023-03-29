import { useForm } from '../hooks/useForm';
import {Link} from 'react-router-dom';

const Register = ({onRegister}) => {
  const {values, handleChange, setValues} = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
    setValues({
      email: '',
      password: '',
    });
  }

  return (
    <div className="auth-forms">
      <h2 className="auth-forms__title">Регистрация</h2>
      <form className="auth-forms__form" name="login" onSubmit={handleSubmit}>
        <label className="auth-forms__field">
          <input id="email-input" type="email" name="email" className="input input_text-color_white" placeholder="Email" onChange={handleChange} value={values.email||''} minLength="2" maxLength="40" required />
        </label>
        <label className="auth-forms__field">
          <input id="password-input" type="password" name="password" className="input input_text-color_white" placeholder="Пароль" onChange={handleChange} value={values.password||''} minLength="2" maxLength="200" required />
        </label>
        <button aria-label="кнопка сохранить" type="submit" className="auth-forms__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="/signin" className="auth-forms__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
