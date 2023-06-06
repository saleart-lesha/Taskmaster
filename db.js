const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const URL = 'mongodb://0.0.0.0:27017/TaskMaster';

let dbConnection;
let profilesCollection;
let tasksCollection;
let usersCollection;
let staffCollection;
let taskCompletedCollection;
let knowledgeBaseCollection;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(URL)
            .then((client) => {
                console.log('Connected to MongoDB');
                dbConnection = client.db();
                profilesCollection = dbConnection.collection('profiles');
                tasksCollection = dbConnection.collection("tasks");
                usersCollection = dbConnection.collection('users');
                staffCollection = dbConnection.collection('staff');
                taskCompletedCollection = dbConnection.collection('taskCompleted');
                knowledgeBaseCollection = dbConnection.collection('KnowledgeBase');
                return cb();
            })
            .catch((err) => {
                return cb(err);
            });
    },
    getDb: () => dbConnection,
    getProfilesCollection: () => profilesCollection,
    getTasksCollection: () => tasksCollection,
    getUsersCollection: () => usersCollection,
    getStaffCollection: () => staffCollection,
    getTaskCompletedCollection: () => taskCompletedCollection,
    getKnowledgeBaseCollection: () => knowledgeBaseCollection
};
