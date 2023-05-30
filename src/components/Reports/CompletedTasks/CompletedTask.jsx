import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CompletedTask.module.css";

const CompletedTasks = ({ onSelect }) => {
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        // Загрузка выполненных задач с сервера
        axios
            .get("http://localhost:3001/api/completedTasks")
            .then((response) => {
                setCompletedTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleTaskSelect = (taskId) => {
        const updatedTasks = completedTasks.map((task) => {
            if (task._id === taskId) {
                return {
                    ...task,
                    isSelected: !task.isSelected,
                };
            }
            return task;
        });
        setCompletedTasks(updatedTasks);
    };

    const formatTextWithLineBreaks = (text) => {
        return text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className={styles["completed-tasks-container"]}>
            <h2>Выполненные задачи</h2>
            {completedTasks.map((task) => (
                <div
                    key={task._id}
                    className={styles["completed-task"]}
                    onClick={() => handleTaskSelect(task._id)}
                >
                    <h3>{task.title}</h3>
                    <p>Сотрудник: {task.employee}</p>
                    <p>Оценка: {task.rating}</p>
                    {task.isSelected && (
                        <div className={styles["task-details"]}>
                            <h4>Подробное описание</h4>
                            <p>Описание: {formatTextWithLineBreaks(task.description)}</p>
                            <p>Дедлайн: {task.deadline}</p>
                            <p>Комментарий: {formatTextWithLineBreaks(task.comment)}</p>
                            {/* Дополнительная информация о задаче */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CompletedTasks;