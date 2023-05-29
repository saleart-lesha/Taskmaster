import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import axios from "axios";

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tasks")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const changeMonth = (delta) => {
        setDate((prevDate) => {
            const newMonth = prevDate.getMonth() + delta;
            const newYear = prevDate.getFullYear();

            if (newMonth > 11) {
                return new Date(newYear + 1, 0, 1);
            } else if (newMonth < 0) {
                return new Date(newYear - 1, 11, 1);
            }

            return new Date(newYear, newMonth, 1);
        });
    };

    const getDaysInMonth = () => {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const getTasksForDate = (day) => {
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), day).toISOString().split('T')[0];
        return tasks.filter(task => task.deadline.split('T')[0] === formattedDate);
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button className={styles.button} onClick={() => changeMonth(-1)}>
                    &lt;
                </button>
                <h2 className={styles.title}>
                    {date.toLocaleString("ru", { month: "long", year: "numeric" })}
                </h2>
                <button className={styles.button} onClick={() => changeMonth(1)}>
                    &gt;
                </button>
            </div>

            <div className={styles.grid}>
                {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((dayName) => (
                    <div key={dayName} className={styles.cell}>
                        {dayName}
                    </div>
                ))}

                {getDaysInMonth().map((day) => {
                    const formattedDate = new Date(date.getFullYear(), date.getMonth(), day).toISOString().split('T')[0];
                    const isToday = formattedDate === new Date().toISOString().split('T')[0];
                    const tasksForDate = getTasksForDate(day);

                    return (
                        <div
                            key={day}
                            className={`${styles.cell} ${tasksForDate.length > 0 ? styles.hasTasks : ""} ${isToday ? styles.today : ""}`}
                        >
                            <div className={styles.day}>{day}</div>
                            {tasksForDate.map((task) => (
                                <div key={task._id} className={styles.task}>{task.title}</div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;