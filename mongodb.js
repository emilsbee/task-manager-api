// CRUD create read update and delete 

// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Destructured version of commented code above. 
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName)

    db.collection('users').deleteOne({ age: 17 }).then((results) => {
        console.log(results);
    }).catch((error) => {
        console.log(error);
    })
})
 