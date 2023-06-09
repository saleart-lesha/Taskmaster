import React, { useState } from "react";
import styles from "./StaffForm.module.css";

const StaffForm = ({ onAdd }) => {
    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffPosition, setNewStaffPosition] = useState("");

    const handleAddStaff = () => {
        if (newStaffName && newStaffPosition) {
            const newStaff = {
                name: newStaffName,
                position: newStaffPosition,
                taskCount: 0,
            };

            onAdd(newStaff);
            setNewStaffName("");
            setNewStaffPosition("");
        } else {
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