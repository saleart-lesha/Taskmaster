import React, { useState, useEffect } from "react";
import axios from "axios";
import ActiveTasks from "./ActiveTasks/ActiveTasks";
import CompletedTasks from "./CompletedTasks/CompletedTask";
import Statistics from "./Statistics/Statistics";
// import EmployeeStats from "./EmployeeStats/EmployeeStats";

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
    const loadTaskStatistics = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/taskStatistics");
            const stats = response.data;
            setTaskStats(stats);
        } catch (error) {
            console.log(error);
        }
    };

    // Загрузка статистики по сотрудникам
    const loadEmployeeStatistics = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/employeeStatistics");
            const stats = response.data;
            setEmployeeStats(stats);
        } catch (error) {
            console.log(error);
        }
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

            <CompletedTasks tasks={completedTasks} onSelect={handleTaskSelect} />

            <Statistics taskStats={taskStats} />

            <h2>Статистика по сотрудникам</h2>
            {/* <EmployeeStats employeeStats={employeeStats} /> */}
        </div>
    );
};

export default Reports;