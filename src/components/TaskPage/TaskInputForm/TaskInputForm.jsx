import React, { useState, useEffect } from "react";
import styles from "./TaskInputForm.module.css";

function TaskInputForm({ employees, onSave }) {
    // Состояния для хранения значений полей формы
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // Обработчики изменения значений полей
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

    // Эффект, отслеживающий заполнение всех полей формы
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
        // Создание новой задачи на основе заполненных полей
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            deadline: taskDeadline,
            employee: selectedEmployee,
        };
        // Вызов функции onSave для сохранения задачи
        onSave(newTask);
        // Очистка полей формы после сохранения
        setTaskTitle("");
        setTaskDescription("");
        setTaskDeadline("");
        setSelectedEmployee("");
    };

    return (
        <div className={styles.inputContainer}>
            {/* Поле ввода названия задачи */}
            <input
                type="text"
                placeholder="Название задачи"
                value={taskTitle}
                onChange={handleTitleChange}
                className={styles.input}
            />
            {/* Поле ввода описания задачи */}
            <textarea
                placeholder="Описание"
                value={taskDescription}
                onChange={handleDescriptionChange}
                className={styles.textarea}
            ></textarea>
            {/* Поле выбора даты дедлайна */}
            <input
                type="date"
                placeholder="Deadline"
                value={taskDeadline}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDeadlineChange}
                className={styles.input}
            />
            {/* Поле выбора сотрудника */}
            <select
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                className={styles.select}
            >
                <option value="">Сотрудники</option>
                {/* Отображение списка сотрудников в виде опций */}
                {employees.map((employee) => (
                    <option key={employee} value={employee}>
                        {employee}
                    </option>
                ))}
            </select>
            {/* Кнопка сохранения задачи */}
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