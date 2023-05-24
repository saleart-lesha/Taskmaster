import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import EditableProfile from "./ProfileEdit/EditableProfile";
import ReadOnlyProfile from "./BIO/ReadOnlyProfile";


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