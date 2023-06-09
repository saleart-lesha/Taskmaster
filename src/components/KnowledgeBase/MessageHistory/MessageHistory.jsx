import React from "react";
import styles from "./MessageHistory.module.css";

const MessageHistory = ({ messages }) => {
    return (
        <div className={styles.messageHistory}>
            <div className={styles.messageWrapper}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>
                        <div className={`${styles.bubble} ${styles.userBubble}`}>
                            <div className={styles.messageText}>{message.message}</div>
                        </div>
                        <div className={`${styles.bubble} ${styles.assistantBubble}`}>
                            <div className={styles.messageText}>{message.reply}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageHistory;
