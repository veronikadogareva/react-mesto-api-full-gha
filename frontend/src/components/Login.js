import React from 'react';

function Login({ handleLogin }) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = React.useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formValue);
    }
    return (
        <section className="login">
            <h2 className='login__title'>Вход</h2>
            <form className="login__form" name='form-login' onSubmit={handleSubmit}>
                <input className="login__input login__input_info_email" id="email-input" name="email"
                    placeholder="Email" required type="email" onChange={handleChange} value={formValue.email} />
                <span className="login__input-error email-input-error"></span>
                <input className="login__input login__input_info_password" id="password-input" type="password" name="password"
                    placeholder="Пароль" required onChange={handleChange} value={formValue.password} />
                <span className="login__input-error password-input-error"></span>
                <p className="login__error">
                    {errorMessage}
                </p>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </section>
    )
}
export default Login;