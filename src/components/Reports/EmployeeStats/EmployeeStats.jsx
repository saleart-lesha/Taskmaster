import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployeeStats.module.css";

const EmployeeStats = () => {
    const [employeeStats, setEmployeeStats] = useState([]);

    useEffect(() => {
        // Загрузка статистики сотрудников при монтировании компонента
        loadEmployeeStatistics();

        // Задаем интервал для опроса сервера каждые 5 секунд
        const interval = setInterval(() => {
            loadEmployeeStatistics();
        }, 5000);

        // Очищаем интервал при размонтировании компонента
        return () => {
            clearInterval(interval);
        };
    }, []);

    const loadEmployeeStatistics = async () => {
        try {
            // Запрос на сервер для получения выполненных задач
            const response = await axios.get("http://localhost:3001/api/completedTasks");
            const tasks = response.data;
            const stats = calculateEmployeeStats(tasks);
            setEmployeeStats(stats);
        } catch (error) {
            console.log(error);
        }
    };

    const calculateEmployeeStats = (tasks) => {
        // Расчет статистики сотрудников на основе выполненных задач
        const stats = {};

        tasks.forEach((task) => {
            const { employee, totalPoints } = task;
            if (employee in stats) {
                stats[employee] += parseInt(totalPoints);
            } else {
                stats[employee] = parseInt(totalPoints);
            }
        });

        return Object.keys(stats).map((employee) => ({
            name: employee,
            totalPoints: stats[employee],
        }));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Статистика сотрудников</h2>
            <table className={styles.statsTable}>
                <thead>
                    <tr>
                        <th>ФИО сотрудника</th>
                        <th>Баллы</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeStats.map((employee) => (
                        <tr key={employee.name}>
                            <td className={styles.employeeName}>{employee.name}</td>
                            <td className={styles.totalPoints}>{employee.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeStats;
