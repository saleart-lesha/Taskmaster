import React, { useState, useEffect } from "react";
import styles from "./TaskComponent.module.css";
import axios from "axios";
import TaskList from "./TaskList/TaskList";
import TaskInputForm from "./TaskInputForm/TaskInputForm";

function TaskDetails({ selectedTask, styles }) {
    // Отображение деталей выбранной задачи
    return (
        <div className={styles.taskDetails}>
            {/* Заголовок выбранной задачи */}
            <h2 className={styles.subheading}>{selectedTask.title}</h2>
            {/* Описание выбранной задачи */}
            <pre className={styles.description}>{selectedTask.description}</pre>
        </div>
    );
}

function TaskComponent() {
    const [tasks, setTasks] = useState([]); // Состояние списка задач
    const [selectedTask, setSelectedTask] = useState(null); // Состояние выбранной задачи
    const [employees, setEmployees] = useState([]); // Состояние списка сотрудников

    const handleSaveTask = (newTask) => {
        // Обработчик сохранения новой задачи
        axios
            .post("http://localhost:3001/api/tasks", newTask) // Отправка POST-запроса для сохранения задачи
            .then((response) => {
                setTasks([...tasks, newTask]); // Добавление новой задачи в список задач
            })
            .catch((error) => {
                console.log("Error saving task:", error);
            });
    };

    const handleTaskClick = (task) => {
        // Обработчик клика на задачу
        setSelectedTask(task); // Установка выбранной задачи
    };

    useEffect(() => {
        // Загрузка списка задач при монтировании компонента
        axios
            .get("http://localhost:3001/api/tasks") // Отправка GET-запроса для получения списка задач
            .then((response) => {
                setTasks(response.data); // Установка полученного списка задач в состояние
            })
            .catch((error) => {
                console.log("Error loading tasks:", error);
            });
    }, []);

    useEffect(() => {
        // Загрузка списка сотрудников при монтировании компонента
        axios
            .get("http://localhost:3001/api/staff") // Отправка GET-запроса для получения списка сотрудников
            .then((response) => {
                const staffList = response.data.map((staff) => staff.name); // Получение списка имен сотрудников
                setEmployees(staffList); // Установка списка сотрудников в состояние
            })
            .catch((error) => {
                console.log("Error loading staff:", error);
            });
    }, []);

    return (
        <div className={styles.container}>
            {/* Заголовок компонента */}
            <h1 className={styles.heading}>Создать задачу</h1>
            <div className={styles.inputContainer}>
                {/* Форма ввода задачи */}
                <TaskInputForm employees={employees} onSave={handleSaveTask} />
            </div>
            {/* Отображение списка задач, если он не пустой */}
            {tasks.length > 0 && (
                <div className={styles.tasksList}>
                    <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
                </div>
            )}
            {/* Отображение деталей выбранной задачи, если она выбрана */}
            {selectedTask && (
                <TaskDetails selectedTask={selectedTask} styles={styles} />
            )}
        </div>
    );
}

export default TaskComponent;
