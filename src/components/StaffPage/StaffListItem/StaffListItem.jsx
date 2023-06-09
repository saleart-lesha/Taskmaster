import React from "react";
import styles from "./StaffListItem.module.css";

const StaffListItem = ({ member, onDelete }) => {
    const handleDeleteClick = () => {
        onDelete(member._id);
    };

    return (
        <li className={styles.member}>
            <div className={styles.memberInfo}>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
            </div>
            <div className={styles.taskCount}>
                <span>{member.taskCount}</span> Задачи
            </div>
            <div className={styles.actions}>
                <button
                    className={styles.deleteButton}
                    onClick={handleDeleteClick}
                >
                    Удалить
                </button>
            </div>
        </li>
    );
};

export default StaffListItem;