// const express = require('express');
// const app = express();

// app.get('/', (req,res)=>{
//      res.send("Welcome to my awesome app!"); 
//  });

// app.listen(3000, function () {
//     console.log("app listening on port 3000");
// });

const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const DB_USER = process.env.MONGO_DB_USERNAME;
const DB_PASS = process.env.MONGO_DB_PWD;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Use this URL when starting the app locally with Docker Compose
let mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;

// Pass these options to the MongoClient connect request to avoid DeprecationWarning for the current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// The following db and collection will be created on first connect
let databaseName = "my-db";
let collectionName = "my-collection";

app.get('/fetch-data', (req, res) => {
    let response = {};
    MongoClient.connect(mongoUrlDockerCompose, mongoClientOptions, (err, client) => {
        if (err) throw err;

        let db = client.db(databaseName);
        let myquery = { myid: 1 };

        db.collection(collectionName).findOne(myquery, (err, result) => {
            if (err) throw err;
            response = result;
            client.close();

            // Send response
            res.send(response ? response : {});
        });
    });
});

app.listen(3000, () => {
    console.log("app listening on port 3000");
});

