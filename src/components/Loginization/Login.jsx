import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                // Успешная аутентификация
                onLogin();
            } else {
                // Неправильный email или пароль
                console.log('Неправильный email или пароль');
            }
        } catch (error) {
            console.error('Ошибка аутентификации', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="email" className={styles.form__label}>
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    className={styles.form__input}
                    value={email}
                    onChange={handleEmailChange}
                />

                <label htmlFor="password" className={styles.form__label}>
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    className={styles.form__input}
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button type="submit" className={styles.form__submit}>
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default Login;