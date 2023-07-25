import React from 'react';
import { NavLink } from 'react-router-dom';

function Register({ handleRegister }) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(formValue);
    }
    return (
        <section className="login">
            <h2 className='login__title'>Регистрация</h2>
            <form className="login__form" name='form-login' onSubmit={handleSubmit}>
                <input className="login__input login__input_info_email" id="email-input" name="email"
                    placeholder="Email" required type="email" onChange={handleChange} value={formValue.email} />
                <span className="login__input-error email-input-error"></span>
                <input className="login__input login__input_info_password" id="password-input" type="password" name="password"
                    placeholder="Пароль" required onChange={handleChange} value={formValue.password} />
                <span className="login__input-error password-input-error"></span>
                <button className="login__button" type="submit">Зарегистрироваться</button>
            </form>
            <NavLink to="/sign-in" className="login__link">Уже зарегистрированы? Войти</NavLink>
        </section>
    )
}
export default Register;