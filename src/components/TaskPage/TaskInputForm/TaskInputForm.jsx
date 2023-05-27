import React, { useState, useEffect } from "react";
import styles from "./TaskInputForm.module.css";

function TaskInputForm({ employees, onSave }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleTitleChange = (event) => {
        setTaskTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setTaskDeadline(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    useEffect(() => {
        // Проверяем, заполнены ли все поля
        const isFormValid =
            taskTitle.trim() !== "" &&
            taskDescription.trim() !== "" &&
            taskDeadline !== "" &&
            selectedEmployee !== "";
        setIsButtonDisabled(!isFormValid);
    }, [taskTitle, taskDescription, taskDeadline, selectedEmployee]);

    const handleSave = () => {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            employee: selectedEmployee,
        };
        onSave(newTask);
        setTaskTitle("");
        setTaskDescription("");
        setTaskDeadline("");
        setSelectedEmployee("");
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                placeholder="Название задачи"
                value={taskTitle}
                onChange={handleTitleChange}
                className={styles.input}
            />
            <textarea
                placeholder="Описание"
                value={taskDescription}
                onChange={handleDescriptionChange}
                className={styles.textarea}
            ></textarea>
            <input
                type="date"
                placeholder="Deadline"
                value={taskDeadline}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDeadlineChange}
                className={styles.input}
            />
            <select
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                className={styles.select}
            >
                <option value="">Сотрудники</option>
                {employees.map((employee) => (
                    <option key={employee} value={employee}>
                        {employee}
                    </option>
                ))}
            </select>
            <button
                onClick={handleSave}
                className={styles.button}
                disabled={isButtonDisabled}
            >
                Сохранить
            </button>
        </div>
    );
}

export default TaskInputForm;