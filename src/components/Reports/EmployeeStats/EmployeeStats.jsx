import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeStats = () => {
    const [employeeStats, setEmployeeStats] = useState([]);

    useEffect(() => {
        loadEmployeeStatistics(); // Загрузка статистики при монтировании компоненты

        const interval = setInterval(() => {
            loadEmployeeStatistics(); // Загрузка статистики через определенные промежутки времени (5 секунд в данном случае)
        }, 5000);

        return () => {
            clearInterval(interval); // Очистка интервала при размонтировании компоненты
        };
    }, []);

    const loadEmployeeStatistics = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/completedTasks");
            const tasks = response.data;
            const stats = calculateEmployeeStats(tasks);
            setEmployeeStats(stats);
        } catch (error) {
            console.log(error);
        }
    };

    const calculateEmployeeStats = (tasks) => {
        const stats = {};

        tasks.forEach((task) => {
            const { employee, rating } = task;
            if (employee in stats) {
                stats[employee] += parseInt(rating);
            } else {
                stats[employee] = parseInt(rating);
            }
        });

        return Object.keys(stats).map((employee) => ({
            name: employee,
            totalPoints: stats[employee],
        }));
    };

    return (
        <div>
            <h2>Статистика по сотрудникам</h2>
            <ul>
                {employeeStats.map((employee) => (
                    <li key={employee.name}>
                        {employee.name}: {employee.totalPoints} баллов
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeStats;