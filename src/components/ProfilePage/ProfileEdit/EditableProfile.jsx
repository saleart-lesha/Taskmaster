import React from "react";
import { Link } from "react-router-dom";
import styles from "./EditableProfile.module.css";

const EditableProfile = ({
    name,
    email,
    phone,
    photo,
    onInputChange,
    onPhotoChange,
    onSave,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onInputChange(name, value);
    };

    return (
        <div className={styles.editable}>
            <label htmlFor="name">
                <a>ФИО:</a>
                <input type="text" id="name" name="name" value={name} onChange={handleInputChange} />
            </label>
            <label htmlFor="email">
                <a>Email:</a>
                <input type="text" id="email" name="email" value={email} onChange={handleInputChange} />
            </label>
            <label htmlFor="phone">
                <a>Телефон:</a>
                <input type="text" id="phone" name="phone" value={phone} onChange={handleInputChange} />
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