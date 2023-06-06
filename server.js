const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require('bcrypt');
const { ObjectId } = require("mongodb");
const { connectToDB, getProfilesCollection, getTasksCollection, getUsersCollection, getStaffCollection, getTaskCompletedCollection, getKnowledgeBaseCollection } = require("./db");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration)



const PORT = 3001;

const app = express();

let profilesCollection;
let tasksCollection;
let usersCollection;
let staffCollection;
let taskCompletedCollection;
let knowledgeBaseCollection;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

connectToDB((err) => {
    if (!err) {
        profilesCollection = getProfilesCollection();
        tasksCollection = getTasksCollection();
        usersCollection = getUsersCollection();
        staffCollection = getStaffCollection();
        taskCompletedCollection = getTaskCompletedCollection();
        knowledgeBaseCollection = getKnowledgeBaseCollection();
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


// Staff

app.get("/api/staff", (req, res) => {
    staffCollection
        .find()
        .toArray()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch staff data" });
        });
});

app.post("/api/staff", (req, res) => {
    const newStaff = req.body;
    newStaff._id = new ObjectId(); // Генерируем новый ObjectId
    staffCollection
        .insertOne(newStaff)
        .then(() => {
            res.status(201).json({ message: "Сотрудник успешно добавлен" });
        })
        .catch((err) => {
            console.log("Ошибка при добавлении сотрудника:", err);
            res.status(500).json({ error: "Не удалось добавить сотрудника" });
        });
});


// ...

app.delete("/api/staff/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Отсутствует идентификатор сотрудника" });
        }
        console.log(id);
        const result = await staffCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Сотрудник успешно удален" });
        } else {
            res.status(404).json({ error: "Сотрудник не найден" });
        }
    } catch (error) {
        console.log("Ошибка при удалении сотрудника:", error);
        res.status(500).json({ error: "Не удалось удалить сотрудника" });
    }
});

app.get("/api/tasks/count", async (req, res) => {
    try {
        const employee = req.query.employee;

        const count = await tasksCollection.countDocuments({ employee });

        res.json({ count });
    } catch (error) {
        console.error("Ошибка при получении количества задач", error);
        res.status(500).json({ error: "Ошибка при получении количества задач" });
    }
});

// календарь
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await tasksCollection.find().toArray();
        res.json(tasks);
    } catch (error) {
        console.error("Ошибка при получении задач", error);
        res.status(500).json({ error: "Ошибка при получении задач" });
    }
});


app.get('/api/completedTasks', async (req, res) => {
    try {
        const completedTasks = await taskCompletedCollection.find().toArray();
        res.json(completedTasks);
    } catch (error) {
        console.error('Ошибка при получении завершенных задач', error);
        res.status(500).json({ error: 'Ошибка при получении завершенных задач' });
    }
});


app.post('/api/taskCompleted', async (req, res) => {
    try {
        const taskCompleted = req.body;
        await taskCompletedCollection.insertOne(taskCompleted);

        const taskId = taskCompleted._id;
        await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });

        res.sendStatus(200);
    } catch (error) {
        console.error('Ошибка при сохранении завершенной задачи', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Отсутствует идентификатор задачи" });
        }
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Задача успешно удалена" });
        } else {
            res.status(404).json({ error: "Задача не найдена" });
        }
    } catch (error) {
        console.log("Ошибка при удалении задачи:", error);
        res.status(500).json({ error: "Не удалось удалить задачу" });
    }
});


app.get("/api/KnowledgeBase", async (req, res) => {
    try {
        const knowledgeBase = await knowledgeBaseCollection.find().toArray();
        res.json(knowledgeBase);
    } catch (error) {
        console.error("Ошибка при получении базы знаний", error);
        res.status(500).json({ error: "Ошибка при получении базы знаний" });
    }
});


app.post("/api/KnowledgeBase", async (req, res) => {
    const { message } = req.body;

    try {
        // Отправляем запрос к модели ChatGPT
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a user" },
                { role: "assistant", content: message },
            ],
        });
        console.log(completion.data.choices);

        let reply = ""; // Значение по умолчанию

        if (completion.data.choices && completion.data.choices.length > 0) {
            reply = completion.data.choices[0].message.content;
        }

        console.log(reply);

        // Сохраняем ответ в коллекцию KnowledgeBase
        await knowledgeBaseCollection.insertOne({ message, reply });

        // Отправляем ответ клиенту
        res.json({ reply });
    } catch (error) {
        console.error("Ошибка при сохранении ответа в базу данных", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});