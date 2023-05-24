import React, { useState } from "react";
import styles from "./TaskList.module.css";


function TaskList({ tasks, onFilter }) {
    return (
        <div className={styles.tasksList}>
            <h2 className={styles.subheading}>Активные задачи</h2>
            <button onClick={onFilter} className={styles.button}>
                Отфильтровать
            </button>
            {tasks.map((task, index) => (
                <div key={index} className={styles.task}>
                    <p>{task.description}</p>
                    <p>{task.deadline}</p>
                    <p>{task.employee}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;