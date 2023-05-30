import React, { useState, useEffect } from "react";
import axios from "axios";
import ActiveTasks from "./ActiveTasks/ActiveTasks";
import CompletedTasks from "./CompletedTasks/CompletedTask";
import Statistics from "./Statistics/Statistics";



const Reports = () => {
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskStats, setTaskStats] = useState({});
    const [employeeStats, setEmployeeStats] = useState({});

    useEffect(() => {
        // Загрузка активных задач из коллекции tasks
        axios
            .get("http://localhost:3001/api/tasks")
            .then((response) => {
                setActiveTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Загрузка выполненных задач из новой коллекции
        // (нужно указать имя коллекции, чтобы я мог предложить, как ее создать)
        axios
            .get("http://localhost:3001/api/completedTasks")
            .then((response) => {
                setCompletedTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // Загрузка статистики задач
        loadTaskStatistics();

        // Загрузка статистики по сотрудникам
        loadEmployeeStatistics();
    }, []);

    // Загрузка статистики задач
    const loadTaskStatistics = () => {
        // Загрузка статистики задач и установка значения в taskStats
        // (реализация будет зависеть от вашей бэкенд-логики)
    };

    // Загрузка статистики по сотрудникам
    const loadEmployeeStatistics = () => {
        // Загрузка статистики по сотрудникам и установка значения в employeeStats
        // (реализация будет зависеть от вашей бэкенд-логики)
    };

    // Обработчик выбора задачи для отображения подробной информации
    const handleTaskSelect = (task) => {
        setSelectedTask(task);
    };

    // Обработчик оценки задачи
    const handleTaskRating = (taskId, rating) => {
        // Отправка оценки задачи на сервер и обновление данных
        // в активных задачах и выполненных задачах
    };

    return (
        <div>
            <h2>Активные задачи</h2>
            <ActiveTasks tasks={activeTasks} onSelect={handleTaskSelect} />

            <h2>Выполненные задачи</h2>
            <CompletedTasks tasks={completedTasks} onSelect={handleTaskSelect} />

            <Statistics taskStats={taskStats} employeeStats={employeeStats} />

            {/* {selectedTask && (
                <TaskDetails
                    task={selectedTask}
                    onRating={handleTaskRating}
                    onClose={() => setSelectedTask(null)}
                />
            )}  */}
        </div>
    );
};

export default Reports;