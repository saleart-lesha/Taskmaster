import React, { useState, useEffect } from "react";
import styles from "./StaffList.module.css";
import axios from "axios";
import StaffListItem from "./StaffListItem/StaffListItem";
import StaffForm from "./StaffForm/StaffForm";

const StaffList = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const staffResponse = await axios.get("http://localhost:3001/api/staff");
            const staffData = staffResponse.data;

            const updatedStaff = await Promise.all(
                staffData.map(async (member) => {
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

    const handleAddStaff = (newStaff) => {
        axios
            .post("http://localhost:3001/api/staff", newStaff)
            .then((response) => {
                fetchStaff();
            })
            .catch((error) => {
                console.log("Ошибка при добавлении сотрудника:", error);
            });
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
                    <StaffListItem
                        key={member._id}
                        member={member}
                        onDelete={handleDeleteStaff}
                    />
                ))}
            </ul>
            <StaffForm onAdd={handleAddStaff} />
        </div>
    );
};

export default StaffList;
