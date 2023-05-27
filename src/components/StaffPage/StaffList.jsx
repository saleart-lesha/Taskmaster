import React, { useState, useEffect } from "react";
import styles from "./StaffList.module.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffPosition, setNewStaffPosition] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/staff")
            .then((response) => {
                setStaff(response.data);
            })
            .catch((error) => {
                console.log("Ошибка при загрузке данных:", error);
            });
    }, []);

    const handleAddStaff = () => {
        if (newStaffName && newStaffPosition) {
            const id = uuidv4(); // Генерация уникального ID для нового сотрудника

            const newStaff = {
                id,
                name: newStaffName,
                position: newStaffPosition,
                taskCount: 0,
            };

            axios
                .post("http://localhost:3001/api/staff", newStaff)
                .then((response) => {
                    setStaff((prevStaff) => [...prevStaff, newStaff]);
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
                    prevStaff.filter((member) => member.id !== id)
                );
            })
            .catch((error) => {
                console.log("Ошибка при удалении сотрудника:", error);
            });
    };

    return (
        <div className={styles.staffListContainer}>
            <h1 className={styles.heading}>Staff List Component</h1>
            <ul className={styles.staffList}>
                {staff.map((member) => (
                    <li key={member.id} className={styles.member}>
                        <div className={styles.memberInfo}>
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                        </div>
                        <div className={styles.taskCount}>
                            <span>{member.taskCount}</span> tasks
                        </div>
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteStaff(member.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className={styles.addMember}>
                <h2>Add New Staff Member</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={newStaffPosition}
                    onChange={(e) => setNewStaffPosition(e.target.value)}
                    className={styles.inputField}
                />
                <button className={styles.addButton} onClick={handleAddStaff}>
                    Add New Staff Member
                </button>
            </div>
        </div>
    );
};

export default StaffList;