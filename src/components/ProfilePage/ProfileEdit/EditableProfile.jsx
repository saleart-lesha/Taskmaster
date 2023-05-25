import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EditableProfile.module.css";

const EditableProfile = ({
    name,
    email,
    phone,
    photo,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onPhotoChange,
    onSave,
}) => {
    return (
        <div className={styles.editable}>
            <label htmlFor="name">
                <a>ФИО:</a>
                <input type="text" id="name" value={name} onChange={onNameChange} />
            </label>
            <label htmlFor="email">
                <a>Email:</a>
                <input type="text" id="email" value={email} onChange={onEmailChange} />
            </label>
            <label htmlFor="phone">
                <a>Телефон:</a>
                <input type="text" id="phone" value={phone} onChange={onPhoneChange} />
            </label>
            <label htmlFor="photo">
                <a>Фото:</a>
                <input type="file" id="photo" onChange={onPhotoChange} />
            </label>
            {photo && <img src={photo} alt="Profile" />}
            <button className={styles.save} onClick={onSave}>
                Сохранить
            </button>
        </div>
    );
};

export default EditableProfile;