import React, { useState } from "react";
import styles from "./StaffForm.module.css";

const StaffForm = ({ onAdd }) => {
    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffPosition, setNewStaffPosition] = useState("");

    // Обработчик добавления нового сотрудника
    const handleAddStaff = () => {
        // Проверка наличия введенного имени и должности
        if (newStaffName && newStaffPosition) {
            // Создание нового сотрудника
            const newStaff = {
                name: newStaffName,
                position: newStaffPosition,
                taskCount: 0,
            };

            // Вызов функции обратного вызова для добавления сотрудника
            onAdd(newStaff);

            // Сброс значений полей ввода
            setNewStaffName("");
            setNewStaffPosition("");
        } else {
            // Оповещение пользователя о необходимости ввести имя и должность
            alert("Please enter both name and position.");
        }
    };

    return (
        <div className={styles.addMember}>
            <h2>Добавить сотрудника</h2>
            <input
                type="text"
                placeholder="ФИО"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="text"
                placeholder="Должность"
                value={newStaffPosition}
                onChange={(e) => setNewStaffPosition(e.target.value)}
                className={styles.inputField}
            />
            <button className={styles.addButton} onClick={handleAddStaff}>
                Добавить
            </button>
        </div>
    );
};

export default StaffForm;