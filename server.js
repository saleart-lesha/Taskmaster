const cors = require("cors");
const express = require("express");
const bcrypt = require('bcrypt');
const { connectToDB, getProfilesCollection, getTasksCollection, getUsersCollection } = require("./db");

const PORT = 3001;

const app = express();

let profilesCollection;
let tasksCollection;
let usersCollection;

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

connectToDB((err) => {
    if (!err) {
        profilesCollection = getProfilesCollection();
        tasksCollection = getTasksCollection();
        usersCollection = getUsersCollection();
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port ${PORT}`);
        });
    } else {
        console.log(`DB connection error: ${err}`);
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Найти пользователя по указанному email
        const user = await usersCollection.findOne({ email });

        if (!user) {
            // Пользователь не найден
            res.sendStatus(401); // Unauthorized
            return;
        }

        if (user.password === password) {
            // Пароль совпадает, аутентификация успешна
            res.sendStatus(200);
        } else {
            // Пароль не совпадает, аутентификация неуспешна
            res.sendStatus(401); // Unauthorized
        }
    } catch (error) {
        console.error('Ошибка аутентификации', error);
        res.sendStatus(500);
    }
});


app.get("/api/profile", async (req, res) => {
    try {
        const profile = await profilesCollection.findOne();
        res.json(profile);
    } catch (error) {
        console.error("Ошибка при получении профиля", error);
        res.status(500).json({ error: "Ошибка при получении профиля" });
    }
});

app.put("/api/profile", async (req, res) => {
    try {
        const updatedProfile = req.body;
        const profile = await profilesCollection.findOne();

        const updateData = {};
        Object.keys(updatedProfile).forEach((key) => {
            if (updatedProfile[key] !== null && key !== "_id") {
                updateData[key] = updatedProfile[key];
            }
        });

        await profilesCollection.updateOne({ _id: profile._id }, { $set: updateData });
        res.sendStatus(200);
    } catch (error) {
        console.error("Ошибка при обновлении профиля", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});


app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await tasksCollection.find().toArray();
        res.json(tasks);
    } catch (error) {
        console.error("Ошибка при получении задач", error);
        res.status(500).json({ error: "Ошибка при получении задач" });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const newTask = req.body;
        await tasksCollection.insertOne(newTask);
        res.sendStatus(200);
    } catch (error) {
        console.error("Ошибка при сохранении задачи", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

