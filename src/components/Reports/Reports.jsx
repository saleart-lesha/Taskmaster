import React, { useState, useEffect } from "react";
import axios from "axios";
import ActiveTasks from "./ActiveTasks/ActiveTasks";
import CompletedTasks from "./CompletedTasks/CompletedTask";
import Statistics from "./Statistics/Statistics";
import EmployeeStats from "./EmployeeStats/EmployeeStats";
import styles from "./Reports.module.css";

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
    const loadEmployeeStatistics = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/completedTasks");
            const stats = response.data;

            // Объединение оценок задач для каждого сотрудника
            const employeeStats = {};
            stats.forEach((task) => {
                const employee = task.employee;
                const rating = parseInt(task.rating);

                if (employeeStats[employee]) {
                    employeeStats[employee] += rating;
                } else {
                    employeeStats[employee] = rating;
                }
            });

            setEmployeeStats(employeeStats);
        } catch (error) {
            console.log(error);
        }
    };

    // Обработчик выбора задачи для отображения подробной информации
    const handleTaskSelect = (task) => {
        setSelectedTask(task);
    };

    return (
        <div>
            <h2>Активные задачи</h2>
            <ActiveTasks tasks={activeTasks} onSelect={handleTaskSelect} />

            <h2>Выполненные задачи</h2>
            <CompletedTasks tasks={completedTasks} onSelect={handleTaskSelect} />

            <div className={styles.statsContainer}>
                <div className={styles.statsColumn}>
                    <EmployeeStats employeeStats={employeeStats} />
                </div>

                <div className={styles.statsColumn}>
                    <Statistics taskStats={taskStats} employeeStats={employeeStats} />
                </div>
            </div>
        </div>
    );
};

export default Reports;