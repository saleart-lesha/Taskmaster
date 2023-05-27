import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={styles.navigation}>
            <Link to="/api/profile" className={styles.link}>Мой профиль</Link>
            <Link to="/api/tasks" className={styles.link}>Задачи</Link>
            <Link to="/reports" className={styles.link}>Отчёты</Link>
            <Link to="/api/staff" className={styles.link}>Сотрудники</Link>
            <Link to="/calendar" className={styles.link}>Календарь</Link>
        </nav>
    );
};

export default NavBar;