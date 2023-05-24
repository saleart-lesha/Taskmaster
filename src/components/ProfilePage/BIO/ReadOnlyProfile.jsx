import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ReadOnlyProfile.module.css";



const ReadOnlyProfile = ({ name, email, phone, photo, onEdit }) => {
    return (
        <div>
            {photo ? (
                <img src={photo} alt="Profile" className={styles.photo} />
            ) : (
                <div className={styles.noPhoto}>
                    <a>No photo</a>
                </div>
            )}
            <div className={styles.bio}>
                <div className={styles.name}>
                    <a>ФИО: {name}</a>
                </div>
                <div>
                    <a>Email: {email}</a>
                </div>
                <div>
                    <a>Телефон: {phone}</a>
                </div>
            </div>
            <button className={styles.edit} onClick={onEdit}>
                Изменить
            </button>
        </div>
    );
};


export default ReadOnlyProfile;