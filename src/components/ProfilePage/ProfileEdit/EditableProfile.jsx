import React from "react";
import { Link } from "react-router-dom";
import styles from "./EditableProfile.module.css";

// Компонент для редактирования профиля
const EditableProfile = ({
    name,              // Имя пользователя
    email,             // Email пользователя
    phone,             // Телефон пользователя
    photo,             // Фото профиля
    onInputChange,     // Обработчик изменения значений полей ввода
    onPhotoChange,     // Обработчик изменения фото
    onSave,            // Обработчик сохранения изменений
}) => {
    // Обработчик изменения значений полей ввода
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    return (
        <div className={styles.editable}>
            {/* Поле ввода для ФИО */}
            <label htmlFor="name">
                <a>ФИО:</a>
                <input type="text" id="name" name="name" value={name} onChange={handleInputChange} />
            </label>
            {/* Поле ввода для Email */}
            <label htmlFor="email">
                <a>Email:</a>
                <input type="text" id="email" name="email" value={email} onChange={handleInputChange} />
            </label>
            {/* Поле ввода для телефона */}
            <label htmlFor="phone">
                <a>Телефон:</a>
                <input type="text" id="phone" name="phone" value={phone} onChange={handleInputChange} />
            </label>
            {/* Поле ввода для загрузки фото */}
            <label htmlFor="photo">
                <a>Фото:</a>
                <input type="file" id="photo" onChange={onPhotoChange} />
            </label>
            {/* Отображение выбранного фото профиля */}
            {photo && <img src={photo} alt="Profile" />}
            {/* Кнопка сохранения изменений */}
            <button className={styles.save} onClick={onSave}>
                Сохранить
            </button>
        </div>
    );
};

export default EditableProfile;
