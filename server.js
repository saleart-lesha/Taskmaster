const cors = require("cors");
const express = require("express");
const { connectToDB, getProfilesCollection } = require("./db");

const PORT = 3001;

const app = express();

let profilesCollection;

app.use(cors());
app.use(express.json());

connectToDB((err) => {
    if (!err) {
        profilesCollection = getProfilesCollection();
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port ${PORT}`);
        });
    } else {
        console.log(`DB connection error: ${err}`);
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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});