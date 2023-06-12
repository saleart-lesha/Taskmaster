import React from "react";
import styles from "./MessageInput.module.css";

const MessageInput = ({ inputText, handleInputChange, sendMessage }) => {
    return (
        <div className={styles.inputContainer}>
            {/*Поле ввода сообщения */}
            <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Введите сообщение..."
                className={styles.inputTextarea}
                rows={3}
            />
            {/* Кнопка отправки сообщения */}
            <button onClick={sendMessage} className={styles.sendButton}>
                Отправить
            </button>
        </div>
    );
};

export default MessageInput;
