const cors = require("cors");
const express = require('express');
const { connectToDB, getDb } = require('./db');
const { async } = require('q');

const PORT = 3001;

const app = express();

let db;

connectToDB((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port ${PORT}`);
        });
        db = getDb();
    }
    else {
        console.log(`DB connection error: ${err}`);
    }
});

app.get("/api/profile", async (req, res) => {
    const profilesCollection = db.collection("profiles");

    const test = await profilesCollection.find()
    console.log(test)
    return res.status(200).send(test)



    // profilesCollection.findOne({}, (err, profile) => {
    //     if (err) {
    //         console.error("Ошибка при получении профиля из базы данных", err);
    //         return res.status(500).json({ error: "Ошибка при получении профиля" });
    //     }
    //     res.status(200);
    //     console.log(profile);
    //     return res.json(profile);
    // });
});

// app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// app.get("/api/profile", (req, res) => {
//     const profilesCollection = db.collection("profiles");

//     profilesCollection.findOne({}, (err, profile) => {
//         if (err) {
//             console.error("Ошибка при получении профиля из базы данных", err);
//             return res.status(500).json({ error: "Ошибка при получении профиля" });
//         }

//         return res.json(profile);
//     });
// });

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
