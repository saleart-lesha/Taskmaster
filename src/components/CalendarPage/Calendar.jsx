import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import axios from "axios";

const Calendar = () => {
    const [date, setDate] = useState(new Date()); // Состояние для хранения текущей даты
    const [tasks, setTasks] = useState([]); // Состояние для хранения задач

    useEffect(() => {
        // Загрузка задач при монтировании компонента
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
        // Изменение текущего месяца
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
        // Получение количества дней в текущем месяце
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const getTasksForDate = (day) => {
        // Получение задач для определенной даты
        const formattedDate = new Date(date.getFullYear(), date.getMonth(), day);
        return tasks.filter((task) => isSameDay(formattedDate, new Date(task.deadline)));
    };

    const isSameDay = (date1, date2) => {
        // Проверка, являются ли две даты одним и тем же днем
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    };

    const getWeekday = (year, month, day) => {
        // Получение дня недели для определенной даты
        const weekday = new Date(year, month, day).getDay();
        return (weekday + 6) % 7; // Добавляем 6 и берем остаток от деления на 7 для получения корректного индекса дня недели
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
                    // Отображение дней недели в заголовке
                    <div key={dayName} className={styles.cell}>
                        {dayName}
                    </div>
                ))}

                {getDaysInMonth().map((day) => {
                    const formattedDate = new Date(date.getFullYear(), date.getMonth(), day);
                    const isToday = isSameDay(formattedDate, new Date());

                    return (
                        <div
                            key={day}
                            className={`${styles.cell} ${isToday ? styles.today : ""}`}
                            style={{ gridColumnStart: getWeekday(date.getFullYear(), date.getMonth(), day) + 1 }}
                        >
                            <div className={styles.day}>{day}</div>
                            {getTasksForDate(day).map((task) => (
                                // Отображение задач для каждой даты
                                <div key={task._id} className={styles.task}>
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
