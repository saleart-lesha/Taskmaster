import React, { useState, useEffect } from "react";
import axios from "axios";
import ReadOnlyProfile from "./BIO/ReadOnlyProfile";
import EditableProfile from "./ProfileEdit/EditableProfile";
import styles from "./Profile.module.css";

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

    const loadProfileData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/profile");
            const profileData = response.data;
            setProfileData(profileData);
        } catch (error) {
            console.error("Ошибка при загрузке профиля", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            const filteredProfileData = Object.fromEntries(
                Object.entries(profileData).filter(([key, value]) => value !== null && value !== "")
            );

            await axios.put("http://localhost:3001/api/profile", filteredProfileData);
            setIsEditing(false);
            loadProfileData();
        } catch (error) {
            console.error("Ошибка при сохранении профиля", error);
        }
    };

    const handleInputChange = (name, value) => {
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        setProfileData((prevData) => ({
            ...prevData,
            photo: URL.createObjectURL(e.target.files[0])
        }));
    };

    const { name, email, phone, photo } = profileData;

    return (
        <div className={styles.profile}>
            {isEditing ? (
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