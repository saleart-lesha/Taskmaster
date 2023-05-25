import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import EditableProfile from "./ProfileEdit/EditableProfile";
import ReadOnlyProfile from "./BIO/ReadOnlyProfile";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/profile");
            const profileData = response.data;
            setName(profileData.name);
            setEmail(profileData.email);
            setPhone(profileData.phone);
            setPhoto(profileData.photo);
        } catch (error) {
            console.error("Ошибка при загрузке профиля", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Выполните здесь запрос на сохранение данных профиля, если необходимо
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
                <EditableProfile
                    name={name}
                    email={email}
                    phone={phone}
                    photo={photo}
                    onNameChange={handleNameChange}
                    onEmailChange={handleEmailChange}
                    onPhoneChange={handlePhoneChange}
                    onPhotoChange={handlePhotoChange}
                    onSave={handleSave}
                />
            ) : (
                <ReadOnlyProfile
                    name={name}
                    email={email}
                    phone={phone}
                    photo={photo}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default Profile;