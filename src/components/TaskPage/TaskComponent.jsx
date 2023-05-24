import React, { useState } from "react";
import styles from "./TaskComponent.module.css";
import TaskInputForm from "./TaskInputForm/TaskInputForm";
import TaskList from "./TaskList/TaskList";


function TaskComponent() {
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [employee, setEmployee] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleEmployeeChange = (event) => {
        setEmployee(event.target.value);
    };

    const handleSave = () => {
        const newTask = {
            description,
            deadline,
            employee,
        };
        setTasks([...tasks, newTask]);
        setDescription("");
        setDeadline("");
        setEmployee("");
    };

    const handleFilter = (event) => {
        const filteredTasks = tasks.slice().sort((a, b) => {
            const nameA = a.employee.toUpperCase();
            const nameB = b.employee.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        setTasks(filteredTasks);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Создать задачу</h1>
            <TaskInputForm
                description={description}
                deadline={deadline}
                employee={employee}
                onDescriptionChange={handleDescriptionChange}
                onDeadlineChange={handleDeadlineChange}
                onEmployeeChange={handleEmployeeChange}
                onSave={handleSave}
            />
            {tasks.length > 0 && (
                <TaskList tasks={tasks} onFilter={handleFilter} />
            )}
        </div>
    );
}

export default TaskComponent;