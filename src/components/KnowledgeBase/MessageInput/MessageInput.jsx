import React from "react";
import styles from "./MessageInput.module.css";

const MessageInput = ({ inputText, handleInputChange, sendMessage }) => {
    return (
        <div className={styles.inputContainer}>
            <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Введите сообщение..."
                className={styles.inputTextarea}
                rows={3}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
                Отправить
            </button>
        </div>
    );
};

export default MessageInput;
