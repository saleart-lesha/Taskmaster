import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Иванов И.И.");
    const [email, setEmail] = useState("ivano.ivan@example.com");
    const [phone, setPhone] = useState("123-456-7890");
    const [photo, setPhoto] = useState("");

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className={styles.profile}>
            {isEditing ? (
                <div className={styles.editable}>
                    <label htmlFor="name">
                        <a>ФИО:</a>
                        <input type="text" id="name" value={name} onChange={handleNameChange} />
                    </label>
                    <label htmlFor="email">
                        <a>Email:</a>
                        <input type="text" id="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <label htmlFor="phone">
                        <a>Телефон:</a>
                        <input type="text" id="phone" value={phone} onChange={handlePhoneChange} />
                    </label>
                    <label htmlFo="photo">
                        <a>Фото:</a>
                        <input type="file" id="photo" onChange={handlePhotoChange} />
                    </label>
                    {photo && <img src={photo} alt="Profile" />}
                    <button className={styles.save} onClick={handleSave}>
                        Сохранить
                    </button>
                </div>
            ) : (
                <div>
                    {photo ? (
                        <img src={photo} alt="Profile" className={styles.photo} />
                    ) : (
                        <div className={styles.noPhoto}>
                            <a>No photo</a>
                        </div>
                    )}
                    <div className={styles.bio}>
                        <div className={styles.name}><a>ФИО: {name}</a></div>
                        <div><a>Email: {email}</a></div>
                        <div><a>Телефон: {phone}</a></div>
                    </div>
                    <button className={styles.edit} onClick={handleEdit}>
                        Изменить
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;