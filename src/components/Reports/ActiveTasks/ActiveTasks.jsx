import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ActiveTasks.module.css';

// Компонент для отображения активных задач
const ActiveTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [expandedTask, setExpandedTask] = useState(null);

    useEffect(() => {
        // Загрузка активных задач
        axios
            .get('http://localhost:3001/api/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleTaskClick = (taskId) => {
        // Обработчик нажатия на задачу
        if (expandedTask === taskId) {
            setExpandedTask(null);
        } else {
            setExpandedTask(taskId);
        }
    };

    const handleRatingChange = (taskId, rating) => {
        // Обработчик изменения оценки задачи
        setTasks((prevTasks) => {
            return prevTasks.map((task) => {
                if (task._id === taskId) {
                    return { ...task, rating: rating };
                }
                return task;
            });
        });
    };

    const handleDifficultyChange = (taskId, difficulty) => {
        // Обработчик изменения сложности задачи
        setTasks((prevTasks) => {
            return prevTasks.map((task) => {
                if (task._id === taskId) {
                    return { ...task, difficulty: difficulty };
                }
                return task;
            });
        });
    };

    const calculateTotalPoints = (rating, difficulty) => {
        // Расчет общих баллов задачи на основе оценки и сложности
        let coefficient;

        switch (difficulty) {
            case '1':
                coefficient = 0.2;
                break;
            case '2':
                coefficient = 0.4;
                break;
            case '3':
                coefficient = 0.6;
                break;
            case '4':
                coefficient = 0.8;
                break;
            case '5':
                coefficient = 1;
                break;
            default:
                coefficient = 0;
        }

        const weightedRating = rating * coefficient;
        const storyPoints = parseInt(difficulty, 10) || 0;
        const totalPoints = Math.round(weightedRating + storyPoints);
        return totalPoints;
    };

    const handleCommentSubmit = (taskId, comment) => {
        // Обработчик отправки комментария к задаче
        setTasks((prevTasks) => {
            return prevTasks.map((task) => {
                if (task._id === taskId) {
                    return { ...task, comment: comment };
                }
                return task;
            });
        });
    };

    // const handleFileDownload = (taskId) => {
    //     // Обработчик скачивания файла для задачи
    //     const task = tasks.find((task) => task._id === taskId);
    //     if (task.file) {
    //         // Загрузка файла
    //         // Реализуйте функционал скачивания файла здесь
    //         console.log('Скачивание файла:', task.file);
    //     }
    // };

    const handleRateTask = (taskId) => {
        // Обработчик оценки задачи
        const task = tasks.find((task) => task._id === taskId);

        if (task.rating && task.comment && task.file) {
            const totalPoints = calculateTotalPoints(task.rating, task.difficulty);

            const taskCompletedData = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                employee: task.employee,
                rating: task.rating,
                comment: task.comment,
                file: task.file,
                totalPoints: totalPoints,
            };

            // Отправка данных о выполненной задаче на сервер
            axios
                .post('http://localhost:3001/api/taskCompleted', taskCompletedData)
                .then((response) => {
                    console.log('Task completed:', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            // Удаление задачи из списка активных задач
            axios
                .request({
                    method: 'DELETE',
                    url: `http://localhost:3001/api/tasks/${taskId}`,
                })
                .then((response) => {
                    console.log('Task deleted:', taskId);
                    setTasks(tasks.filter((task) => task._id !== taskId));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('Заполните все поля оценки, комментария и файла');
        }
    };

    return (
        <div className={styles.activeTasks}>
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className={`${styles.task} ${expandedTask === task._id ? styles.expanded : ''}`}
                    onClick={() => handleTaskClick(task._id)}
                >
                    <h3>{task.title}</h3>
                    {expandedTask === task._id && (
                        <div className={styles.taskDetails}>
                            <div>
                                <strong>Описание:</strong>
                                <pre>{task.description}</pre>
                            </div>
                            <div>
                                <strong>Дедлайн:</strong> {task.deadline}
                            </div>
                            <div>
                                <strong>Сотрудник:</strong> {task.employee}
                            </div>
                            <div className={styles.taskActions}>
                                <div className={styles.rating}>
                                    <label>Оценка:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={task.rating || ''}
                                        onChange={(e) => handleRatingChange(task._id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <div className={styles.difficulty}>
                                    <label>Сложность:</label>
                                    <select
                                        value={task.difficulty || ''}
                                        onChange={(e) => handleDifficultyChange(task._id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option value="">Выберите сложность</option>
                                        <option value="1">1 - Низкая</option>
                                        <option value="2">2 - Средняя</option>
                                        <option value="3">3 - Высокая</option>
                                        <option value="4">4 - Очень высокая</option>
                                        <option value="5">5 - Критическая</option>
                                    </select>
                                </div>
                                <div className={styles.comment}>
                                    <label>Комментарий:</label>
                                    <textarea
                                        value={task.comment || ''}
                                        onChange={(e) => handleCommentSubmit(task._id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    ></textarea>
                                </div>
                                <div className={styles.file}>
                                    <label>Скачать файл:</label>
                                    <button>Скачать</button>
                                </div>
                                <button onClick={() => handleRateTask(task._id)}>Оценить</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ActiveTasks;
