import React from "react";
import styles from "./MessageHistory.module.css";

const MessageHistory = ({ messages }) => {
    return (
        <div className={styles.messageHistory}>
            <div className={styles.messageWrapper}>
                {/* Отображение истории сообщений */}
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>
                        {/* Обертка для сообщения пользователя */}
                        <div className={`${styles.bubble} ${styles.userBubble}`}>
                            {/* Текст сообщения пользователя */}
                            <div className={styles.messageText}>{message.message}</div>
                        </div>
                        {/* Обертка для ответа ассистента */}
                        <div className={`${styles.bubble} ${styles.assistantBubble}`}>
                            {/* Текст ответа ассистента */}
                            <div className={styles.messageText}>{message.reply}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageHistory;
