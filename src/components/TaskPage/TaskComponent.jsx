import React, { useState } from "react";
import styles from "./TaskComponent.module.css";

function TaskComponent() {
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [employee, setEmployee] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setEmployee(event.target.value);
    };

    const handleSave = () => {
        const newTask = {
            description,
            deadline,
            employee,
        };
        setTasks([...tasks, newTask]);
        setDescription("");
        setDeadline("");
        setEmployee("");
    };

    const handleFilter = (event) => {
        const filteredTasks = tasks.slice().sort((a, b) => {
            const nameA = a.employee.toUpperCase();
            const nameB = b.employee.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setTasks(filteredTasks);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Создать задачу</h1>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={handleDescriptionChange}
                    className={styles.input}
                />
                <input
                    type="date"
                    placeholder="Deadline"
                    value={deadline}
                    onChange={handleDeadlineChange}
                    className={styles.input}
                />
                <select
                    value={employee}
                    onChange={handleEmployeeChange}
                    className={styles.select}
                >
                    <option value="">Сотрудники</option>
                    <option value="Иванов И.И">Иванов И.И</option>
                    <option value="Петров П.П">Петров П.П</option>
                    <option value="Кириллов А.А">Кириллов А.А</option>
                    <option value="Субботин К.А">Субботин К.А</option>
                </select>
                <button onClick={handleSave} className={styles.button}>
                    Сохранить
                </button>
            </div>
            {tasks.length > 0 && (
                <div className={styles.tasksList}>
                    <h2 className={styles.subheading}>Активные задачи</h2>
                    <button onClick={handleFilter} className={styles.button}>
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
            )}
        </div>
    );
}

export default TaskComponent;