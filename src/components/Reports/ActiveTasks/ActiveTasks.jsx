import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ActiveTasks.module.css';

const ActiveTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [expandedTask, setExpandedTask] = useState(null);

    useEffect(() => {
        // Получение активных задач из коллекции tasks
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
        // Здесь вы можете определить логику открытия/закрытия подробной информации о задаче
        if (expandedTask === taskId) {
            setExpandedTask(null);
        } else {
            setExpandedTask(taskId);
        }
    };

    const handleRatingChange = (taskId, rating) => {
        // Обработчик изменения оценки задачи
        // Здесь вы можете обновить локальное состояние задачи с новой оценкой
        // или отправить запрос на сервер для обновления оценки задачи в базе данных
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, rating: rating };
                }
                return task;
            });
        });
    };

    const handleCommentSubmit = (taskId, comment) => {
        // Обработчик отправки комментария к задаче
        // Здесь вы можете обновить локальное состояние задачи с новым комментарием
        // или отправить запрос на сервер для сохранения комментария в базе данных
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, comment: comment };
                }
                return task;
            });
        });
    };

    const handleFileUpload = (taskId, file) => {
        // Обработчик загрузки файла для задачи
        // Здесь вы можете отправить запрос на сервер для сохранения файла в базе данных
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, file: file };
                }
                return task;
            });
        });
    };

    const handleRateTask = (taskId) => {
        // Обработчик нажатия на кнопку "Оценить" задачи
        // Здесь вы можете проверить, заполнены ли все поля оценки, комментария и файла
        // и отправить данные в коллекцию taskCompleted, а затем удалить задачу из коллекции tasks
        const task = tasks.find((task) => task._id === taskId);

        // Проверка на заполнение полей
        if (task.rating && task.comment && task.file) {
            // Отправка данных в коллекцию taskCompleted
            const taskCompletedData = {
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                employee: task.employee,
                rating: task.rating,
                comment: task.comment,
                file: task.file,
            };

            axios
                .post('http://localhost:3001/api/taskCompleted', taskCompletedData)
                .then((response) => {
                    console.log('Task completed:', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            // Удаление задачи из коллекции tasks
            axios
                .request({
                    method: 'DELETE',
                    url: `http://localhost:3001/api/tasks/${taskId}`,
                })
                .then((response) => {
                    console.log('Task deleted:', taskId);
                    // Обновление списка задач
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
                                <div className={styles.comment}>
                                    <label>Комментарий:</label>
                                    <textarea
                                        value={task.comment || ''}
                                        onChange={(e) => handleCommentSubmit(task._id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    ></textarea>
                                </div>
                                <div className={styles.file}>
                                    <label>Прикрепить файл:</label>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload(task._id, e.target.files[0])}
                                        onClick={(e) => e.stopPropagation()}
                                    />
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