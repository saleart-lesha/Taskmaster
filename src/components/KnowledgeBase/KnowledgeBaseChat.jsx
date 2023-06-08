import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KnowledgeBaseChat.module.css";

const KnowledgeBaseChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        loadMessageHistory();
    }, []);

    const loadMessageHistory = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/KnowledgeBase");
            const messageHistory = response.data;
            console.log(messageHistory);
            setMessages(messageHistory);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async () => {
        try {
            axios.defaults.headers.post["Content-Type"] = "application/json";

            const response = await axios.post("http://localhost:3001/api/KnowledgeBase", {
                message: inputText,
            });
            const newMessage = response.data;
            setMessages([...messages, { message: inputText, reply: newMessage.reply }]);
            setInputText("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles["chat-heading"]}>База знаний: Чат</h2>
            <div className={styles["message-history"]}>
                <div className={styles["message-wrapper"]}>
                    {messages.map((message, index) => (
                        <div key={index} className={styles.message}>
                            <div
                                className={`${styles.bubble} ${styles["user-bubble"]}`}
                            >
                                <div className={styles["message-text"]}>{message.message}</div>
                            </div>
                            <div
                                className={`${styles.bubble} ${styles["assistant-bubble"]}`}
                            >
                                <div className={styles["message-text"]}>{message.reply}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles["input-container"]}>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Введите сообщение..."
                    className={styles["input-text"]}
                />
                <button onClick={sendMessage} className={styles["send-button"]}>
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default KnowledgeBaseChat;
