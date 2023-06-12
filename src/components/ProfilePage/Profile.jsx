import React, { useState, useEffect } from "react";
import axios from "axios";
import ReadOnlyProfile from "./BIO/ReadOnlyProfile";
import EditableProfile from "./ProfileEdit/EditableProfile";
import styles from "./Profile.module.css";

// Компонент для отображения профиля пользователя
const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        photo: ""
    });

    useEffect(() => {
        loadProfileData();
    }, []);

    // Загрузка данных профиля
    const loadProfileData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/profile");
            const profileData = response.data;
            setProfileData(profileData);
        } catch (error) {
            console.error("Ошибка при загрузке профиля", error);
        }
    };

    // Обработчик события редактирования профиля
    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Сохранение профиля
    const handleSave = async () => {
        try {
            // Фильтрация данных профиля, удаляя пустые значения
            const filteredProfileData = Object.fromEntries(
                Object.entries(profileData).filter(([key, value]) => value !== null && value !== "")
            );

            // Отправка отфильтрованных данных профиля на сервер для сохранения
            await axios.put("http://localhost:3001/api/profile", filteredProfileData);
            setIsEditing(false);
            loadProfileData();
        } catch (error) {
            console.error("Ошибка при сохранении профиля", error);
        }
    };

    // Обработчик изменения полей ввода профиля
    const handleInputChange = (name, value) => {
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Обработчик изменения фото профиля
    const handlePhotoChange = (e) => {
        setProfileData((prevData) => ({
            ...prevData,
            photo: URL.createObjectURL(e.target.files[0])
        }));
    };

    const { name, email, phone, photo } = profileData;

    return (
        <div className={styles.profile}>
            {/* Проверка режима редактирования профиля */}
            {isEditing ? (
                // Компонент для редактирования профиля
                <EditableProfile
                    name={name}
                    email={email}
                    phone={phone}
                    photo={photo}
                    onInputChange={handleInputChange}
                    onPhotoChange={handlePhotoChange}
                    onSave={handleSave}
                />
            ) : (
                // Компонент для отображения только чтения профиля
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