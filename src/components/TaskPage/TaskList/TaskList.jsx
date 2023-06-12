import styles from "./TaskList.module.css";

function TaskList({ tasks, onTaskClick }) {
    // Отображение списка задач
    return (
        <div className={styles.tasksList}>
            {/* Заголовок списка */}
            <h2 className={styles.subheading}>Активные задачи</h2>
            {/* Маппинг и отображение каждой задачи */}
            {tasks.map((task, index) => (
                <div
                    key={index}
                    className={styles.task}
                    onClick={() => onTaskClick(task)}
                >
                    {/* Отображение названия задачи */}
                    <p>{task.title}</p>
                    {/* Отображение дедлайна задачи */}
                    <p>{task.deadline}</p>
                    {/* Отображение исполнителя задачи */}
                    <p>{task.employee}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
