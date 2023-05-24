import React, { useState } from "react";
import styles from "./TaskInputForm.module.css";

function TaskInputForm({ description, deadline, employee, onDescriptionChange, onDeadlineChange, onEmployeeChange, onSave }) {
    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                placeholder="Описание"
                value={description}
                onChange={onDescriptionChange}
                className={styles.input}
            />
            <input
                type="date"
                placeholder="Deadline"
                value={deadline}
                onChange={onDeadlineChange}
                className={styles.input}
            />
            <select
                value={employee}
                onChange={onEmployeeChange}
                className={styles.select}
            >
                <option value="">Сотрудники</option>
                <option value="Иванов И.И">Иванов И.И</option>
                <option value="Петров П.П">Петров П.П</option>
                <option value="Кириллов А.А">Кириллов А.А</option>
                <option value="Субботин К.А">Субботин К.А</option>
            </select>
            <button onClick={onSave} className={styles.button}>
                Сохранить
            </button>
        </div>
    );
}

export default TaskInputForm;