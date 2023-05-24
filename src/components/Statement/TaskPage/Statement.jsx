import React, { useState } from "react";
import styles from "./Statement.module.css";

const Statement = (tasks) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [sortedTasks, setSortedTasks] = useState(Object.values(tasks.tasks));

    const handleSortTasks = () => {
        const incompleteTasks = sortedTasks.filter((task) => !task.completed);
        const completedTasks = sortedTasks.filter((task) => task.completed);
        setSortedTasks([...completedTasks, ...incompleteTasks]);
    };

    const handleTaskClick = (index) => {
        setSelectedTask(sortedTasks[index]);
        setRating(sortedTasks[index].rating);
        setComment(sortedTasks[index].comment);
    };

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSaveRating = () => {
        const newTasks = Object.assign({}, tasks.tasks);
        newTasks[selectedTask.id].rating = rating;
        newTasks[selectedTask.id].comment = comment;
        setSortedTasks(Object.values(newTasks));
        setSelectedTask(null);
        setRating(0);
        setComment("");
    };

    const handleDownloadFile = () => {
        // download selectedFile
    };

    return (
        <div>
            <h1>Statement Component</h1>
            <button onClick={handleSortTasks}>Sort by Status</button>
            {sortedTasks.map((task, index) => (
                <div key={index} onClick={() => handleTaskClick(index)}>
                    {task.description}
                    {task.deadline}
                    {task.employee}
                </div>
            ))}
            {selectedTask && (
                <div>
                    <h2>Task Details</h2>
                    <p>Description: {selectedTask.description}</p>
                    <p>Deadline: {selectedTask.deadline}</p>
                    <p>Employee: {selectedTask.employee}</p>
                    <p>
                        Status: {selectedTask.completed ? "Completed" : "Incomplete"}
                    </p>
                    {selectedTask.completed && (
                        <div>
                            <button onClick={handleDownloadFile}>Download File</button>
                            <p>
                                Rating:{" "}
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    value={rating}
                                    onChange={handleRatingChange}
                                />
                            </p>
                            <p>
                                Comment:{" "}
                                <input value={comment} onChange={handleCommentChange} />
                            </p>
                            <button onClick={handleSaveRating}>Save Rating</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Statement;