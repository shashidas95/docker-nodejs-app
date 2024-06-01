// Read the administrative username and password from the environment variables
var adminUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
var adminPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

// Connect to the "admin" database to authenticate
var adminDB = db.getSiblingDB('admin');
adminDB.auth(adminUsername, adminPassword);

// Switch to the desired database (e.g., "mydatabase")
var myDatabase = db.getSiblingDB('mydatabase');

// Create the user with the desired username and password
myDatabase.createUser({
 user: process.env.MYAPP_DB_USERNAME,
 pwd: process.env.MYAPP_DB_PASSWORD,
 roles: [{ role: "readWrite", db: "mydatabase" }]
});
