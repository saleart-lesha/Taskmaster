import React, { useState, useEffect } from "react";
import styles from "./TaskComponent.module.css";
import axios from "axios";
import TaskList from "./TaskList/TaskList";
import TaskInputForm from "./TaskInputForm/TaskInputForm";

function TaskDetails({ selectedTask, styles }) {
    return (
        <div className={styles.taskDetails}>
            <h2 className={styles.subheading}>{selectedTask.title}</h2>
            <pre className={styles.description}>{selectedTask.description}</pre>
        </div>
    );
}

function TaskComponent() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [employees, setEmployees] = useState([]);

    const handleSaveTask = (newTask) => {
        axios
            .post("http://localhost:3001/api/tasks", newTask)
            .then((response) => {
                setTasks([...tasks, newTask]);
            })
            .catch((error) => {
                console.log("Error saving task:", error);
            });
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tasks")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log("Error loading tasks:", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/staff") // Путь к API для получения списка сотрудников
            .then((response) => {
                const staffList = response.data.map((staff) => staff.name);
                setEmployees(staffList);
            })
            .catch((error) => {
                console.log("Error loading staff:", error);
            });
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Создать задачу</h1>
            <div className={styles.inputContainer}>
                <TaskInputForm employees={employees} onSave={handleSaveTask} />
            </div>
            {tasks.length > 0 && (
                <div className={styles.tasksList}>
                    <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
                </div>
            )}
            {selectedTask && (
                <TaskDetails selectedTask={selectedTask} styles={styles} />
            )}
        </div>
    );
}

export default TaskComponent;