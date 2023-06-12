import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KnowledgeBaseChat.module.css";
import MessageHistory from "./MessageHistory/MessageHistory";
import MessageInput from "./MessageInput/MessageInput";

const KnowledgeBaseChat = () => {
    const [messages, setMessages] = useState([]); // Состояние для хранения сообщений чата
    const [inputText, setInputText] = useState(""); // Состояние для хранения текста ввода

    useEffect(() => {
        loadMessageHistory();
    }, []);

    const loadMessageHistory = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/KnowledgeBase");
            const messageHistory = response.data;
            console.log(messageHistory);
            setMessages(messageHistory); // Загрузка и установка истории сообщений
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
            setMessages([...messages, { message: inputText, reply: newMessage.reply }]); // Отправка нового сообщения и добавление его в историю
            setInputText(""); // Сброс текста ввода после отправки сообщения
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value); // Обработка изменений текста ввода
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.chatHeading}>База знаний</h2>
            <MessageHistory messages={messages} /> {/* Компонент для отображения истории сообщений */}
            <MessageInput
                inputText={inputText}
                handleInputChange={handleInputChange}
                sendMessage={sendMessage}
            /> {/* Компонент для ввода сообщения */}
        </div>
    );
};

export default KnowledgeBaseChat;
