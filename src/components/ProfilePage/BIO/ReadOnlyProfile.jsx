import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ReadOnlyProfile.module.css";

// Компонент для отображения только чтения профиля
const ReadOnlyProfile = ({ name, email, phone, photo, onEdit }) => {
    return (
        <div>
            {/* Отображение фото профиля */}
            {photo ? (
                <img src={photo} alt="Profile" className={styles.photo} />
            ) : (
                <div className={styles.noPhoto}>
                    <a>No photo</a>
                </div>
            )}
            {/* Блок с информацией о профиле */}
            <div className={styles.bio}>
                {/* Отображение имени пользователя */}
                <div className={styles.name}>
                    <a>ФИО: {name}</a>
                </div>
                {/* Отображение email */}
                <div>
                    <a>Email: {email}</a>
                </div>
                {/* Отображение телефона */}
                <div>
                    <a>Телефон: {phone}</a>
                </div>
            </div>
            {/* Кнопка для редактирования профиля */}
            <button className={styles.edit} onClick={onEdit}>
                Изменить
            </button>
        </div>
    );
};

export default ReadOnlyProfile;
