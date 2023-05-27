import styles from "./TaskList.module.css";


function TaskList({ tasks, onTaskClick }) {
    return (
        <div className={styles.tasksList}>
            <h2 className={styles.subheading}>Активные задачи</h2>
            {tasks.map((task, index) => (
                <div
                    key={index}
                    className={styles.task}
                    onClick={() => onTaskClick(task)}
                >
                    <p>{task.title}</p>
                    <p>{task.deadline}</p>
                    <p>{task.employee}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;