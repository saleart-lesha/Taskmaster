import React, { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar = () => {
    const [date, setDate] = useState(new Date());

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
        const daysInMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const getDaysInPrevMonth = () => {
        const lastDayPrevMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();

        const startWeekDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDay();

        return Array.from(
            { length: startWeekDay },
            (_, i) => lastDayPrevMonth - startWeekDay + i + 1
        );
    };

    const getDaysInNextMonth = () => {
        const lastDayCurrMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        const lastDayCurrWeekDay = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();

        const remainingDays = 7 - lastDayCurrWeekDay;

        return Array.from({ length: remainingDays }, (_, i) => i + 1);
    };

    return (
        <div className={styles["calendar-header"]}>
            <button onClick={() => changeMonth(-1)}>Предыдущий месяц</button>
            <h2>
                {date.toLocaleString("ru", { month: "long", year: "numeric" })}
            </h2>
            <button onClick={() => changeMonth(1)}>Следующий месяц</button>

            <div className={styles["calendar-grid"]}>
                {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((dayName) => (
                    <div key={dayName} className={styles["calendar-cell"]}>
                        {dayName}
                    </div>
                ))}
                {[...getDaysInPrevMonth(), ...getDaysInMonth(), ...getDaysInNextMonth()].map(
                    (day, i) => {
                        const isPrevMonth = i < getDaysInPrevMonth().length;
                        const isNextMonth =
                            i >= getDaysInPrevMonth().length + getDaysInMonth().length;
                        const isToday =
                            new Date().toDateString() ===
                            new Date(date.getFullYear(), date.getMonth(), day).toDateString();
                        return (
                            <div
                                key={i}
                                className={`${styles["calendar-cell"]} ${isPrevMonth || isNextMonth ? styles["muted"] : ""
                                    } ${isToday ? styles["today"] : ""}`}
                            >
                                {day}
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};

export default Calendar;