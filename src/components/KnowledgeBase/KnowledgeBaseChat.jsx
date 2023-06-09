import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KnowledgeBaseChat.module.css";
import MessageHistory from "./MessageHistory/MessageHistory";
import MessageInput from "./MessageInput/MessageInput";

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
            <h2 className={styles.chatHeading}>База знаний</h2>
            <MessageHistory messages={messages} />
            <MessageInput
                inputText={inputText}
                handleInputChange={handleInputChange}
                sendMessage={sendMessage}
            />
        </div>
    );
};

export default KnowledgeBaseChat;
