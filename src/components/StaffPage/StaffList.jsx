import React, { useState, useEffect } from "react";
import styles from "./StaffList.module.css";
import axios from "axios";

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffPosition, setNewStaffPosition] = useState("");

    useEffect(() => {
        fetchStaff();
    }, []); // Передаем пустой массив зависимостей, чтобы эффект выполнился только один раз при загрузке компонента

    const fetchStaff = () => {
        axios
            .get("http://localhost:3001/api/staff")
            .then((response) => {
                setStaff(response.data);
            })
            .catch((error) => {
                console.log("Ошибка при загрузке данных:", error);
            });
    };

    const handleAddStaff = () => {
        if (newStaffName && newStaffPosition) {
            const newStaff = {
                name: newStaffName,
                position: newStaffPosition,
                taskCount: 0,
            };

            axios
                .post("http://localhost:3001/api/staff", newStaff)
                .then((response) => {
                    fetchStaff(); // Обновляем список сотрудников после добавления
                    setNewStaffName("");
                    setNewStaffPosition("");
                })
                .catch((error) => {
                    console.log("Ошибка при добавлении сотрудника:", error);
                });
        } else {
            alert("Please enter both name and position.");
        }
    };

    const handleDeleteStaff = (id) => {
        axios
            .delete(`http://localhost:3001/api/staff/${id}`)
            .then((response) => {
                setStaff((prevStaff) =>
                    prevStaff.filter((member) => member._id !== id)
                );
            })
            .catch((error) => {
                console.log("Ошибка при удалении сотрудника:", error);
            });
    };


    return (
        <div className={styles.staffListContainer}>
            <h1 className={styles.heading}>Список сотрудников</h1>
            <ul className={styles.staffList}>
                {staff.map((member) => (
                    <li key={member.id} className={styles.member}>
                        <div className={styles.memberInfo}>
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                        <div className={styles.taskCount}>
                            <span>{member.taskCount}</span> Задачи
                        </div>
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteStaff(member._id)}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
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
        </div>
    );
};

export default StaffList;