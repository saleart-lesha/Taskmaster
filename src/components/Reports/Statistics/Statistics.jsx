import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styles from "./Statistics.module.css";

const Statistics = () => {
    const [taskStats, setTaskStats] = useState(null);

    useEffect(() => {
        loadTaskStatistics();
    }, []);

    const loadTaskStatistics = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/completedTasks");
            const tasks = response.data;
            const stats = {
                0: 0,
                20: 0,
                40: 0,
                60: 0,
                80: 0,
                100: 0,
            };

            tasks.forEach((task) => {
                const rating = parseInt(task.rating);
                if (rating >= 0 && rating <= 20) {
                    stats[0]++;
                } else if (rating > 20 && rating <= 40) {
                    stats[20]++;
                } else if (rating > 40 && rating <= 60) {
                    stats[40]++;
                } else if (rating > 60 && rating <= 80) {
                    stats[60]++;
                } else if (rating > 80 && rating <= 100) {
                    stats[80]++;
                }
            });

            setTaskStats(stats);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (taskStats) {
            try {
                Chart.register(...Object.values(Chart.controllers));
            } catch (error) {
                console.log(error);
            }
        }
    }, [taskStats]);

    const data = {
        labels: ["0-20", "21-40", "41-60", "61-80", "81-100"],
        datasets: [
            {
                label: "Количество выполненных задач",
                data: taskStats ? Object.values(taskStats) : [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: taskStats ? Math.max(...Object.values(taskStats)) + 1 : 1,
            },
        },
    };

    return (
        <div className={styles.container}>
            <h3 className={styles["chart-title"]}>Статистика выполненных задач</h3>
            {taskStats ? (
                <div className={styles["chart-container"]}>
                    <Bar data={data} options={options} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Statistics;