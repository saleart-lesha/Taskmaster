const { MongoClient } = require('mongodb');

const URL = 'mongodb://0.0.0.0:27017/TaskMaster';

let dbConnection;
let profilesCollection;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(URL)
            .then((client) => {
                console.log('Connected to MongoDB');
                dbConnection = client.db();
                profilesCollection = dbConnection.collection('profiles');
                return cb();
            })
            .catch((err) => {
                return cb(err);
            });
    },
    getDb: () => dbConnection,
    getProfilesCollection: () => profilesCollection
};