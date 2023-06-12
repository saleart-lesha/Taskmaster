import React, { useState, useEffect } from "react";
import styles from "./StaffList.module.css";
import axios from "axios";
import StaffListItem from "./StaffListItem/StaffListItem";
import StaffForm from "./StaffForm/StaffForm";

const StaffList = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        // Загрузка списка сотрудников при монтировании компонента
        fetchStaff();
    }, []);

    // Функция для загрузки списка сотрудников
    const fetchStaff = async () => {
        try {
            // Запрос к серверу для получения данных о сотрудниках
            const staffResponse = await axios.get("http://localhost:3001/api/staff");
            const staffData = staffResponse.data;

            // Обновление списка сотрудников с информацией о количестве задач
            const updatedStaff = await Promise.all(
                staffData.map(async (member) => {
                    // Запрос к серверу для получения количества задач для каждого сотрудника
                    const countResponse = await axios.get(
                        `http://localhost:3001/api/tasks/count?employee=${encodeURIComponent(
                            member.name
                        )}`
                    );
                    const taskCount = countResponse.data.count;

                    return {
                        ...member,
                        taskCount: taskCount,
                    };
                })
            );

            setStaff(updatedStaff);
        } catch (error) {
            console.log("Ошибка при загрузке данных:", error);
        }
    };

    // Обработчик добавления нового сотрудника
    const handleAddStaff = (newStaff) => {
        axios
            .post("http://localhost:3001/api/staff", newStaff)
            .then((response) => {
                // После успешного добавления обновляем список сотрудников
                fetchStaff();
            })
            .catch((error) => {
                console.log("Ошибка при добавлении сотрудника:", error);
            });
    };

    // Обработчик удаления сотрудника
    const handleDeleteStaff = (id) => {
        axios
            .delete(`http://localhost:3001/api/staff/${id}`)
            .then((response) => {
                // После успешного удаления обновляем список сотрудников
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
                {/* Отображение каждого сотрудника в виде отдельного элемента списка */}
                {staff.map((member) => (
                    <StaffListItem
                        key={member._id}
                        member={member}
                        onDelete={handleDeleteStaff}
                    />
                ))}
            </ul>
            {/* Форма для добавления нового сотрудника */}
            <StaffForm onAdd={handleAddStaff} />
        </div>
    );
};

export default StaffList;
