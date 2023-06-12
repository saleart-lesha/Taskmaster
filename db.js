const { MongoClient } = require('mongodb'); // Подключение MongoClient из модуля mongodb
const { ObjectId } = require('mongodb'); // Подключение ObjectId из модуля mongodb

const URL = 'mongodb://0.0.0.0:27017/TaskMaster'; // URL для подключения к MongoDB

let dbConnection; // Переменная для хранения подключения к базе данных
let profilesCollection; // Переменная для хранения коллекции "profiles" базы данных
let tasksCollection; // Переменная для хранения коллекции "tasks" базы данных
let usersCollection; // Переменная для хранения коллекции "users" базы данных
let staffCollection; // Переменная для хранения коллекции "staff" базы данных
let taskCompletedCollection; // Переменная для хранения коллекции "taskCompleted" базы данных
let knowledgeBaseCollection; // Переменная для хранения коллекции "knowledgeBase" базы данных

module.exports = {
    connectToDB: (cb) => {
        // Метод для подключения к базе данных
        MongoClient.connect(URL) // Подключение к MongoDB по указанному URL
            .then((client) => {
                console.log('Connected to MongoDB');
                dbConnection = client.db(); // Установка подключения к базе данных
                profilesCollection = dbConnection.collection('profiles'); // Установка коллекции "profiles"
                tasksCollection = dbConnection.collection("tasks"); // Установка коллекции "tasks"
                usersCollection = dbConnection.collection('users'); // Установка коллекции "users"
                staffCollection = dbConnection.collection('staff'); // Установка коллекции "staff"
                taskCompletedCollection = dbConnection.collection('taskCompleted'); // Установка коллекции "taskCompleted"
                knowledgeBaseCollection = dbConnection.collection('KnowledgeBase'); // Установка коллекции "knowledgeBase"
                return cb(); // Вызов обратной функции после успешного подключения
            })
            .catch((err) => {
                return cb(err); // Вызов обратной функции с ошибкой, если произошла ошибка подключения
            });
    },
    getDb: () => dbConnection, // Метод для получения подключения к базе данных
    getProfilesCollection: () => profilesCollection, // Метод для получения коллекции "profiles"
    getTasksCollection: () => tasksCollection, // Метод для получения коллекции "tasks"
    getUsersCollection: () => usersCollection, // Метод для получения коллекции "users"
    getStaffCollection: () => staffCollection, // Метод для получения коллекции "staff"
    getTaskCompletedCollection: () => taskCompletedCollection, // Метод для получения коллекции "taskCompleted"
    getKnowledgeBaseCollection: () => knowledgeBaseCollection // Метод для получения коллекции "knowledgeBase"
};
