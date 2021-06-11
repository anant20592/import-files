const mongoose = require('mongoose');
const config = require('./config');
//var connDB = "mongodb+srv://anant1:Admin@cluster553.oap06.gcp.mongodb.net/test"

let connection = null;

module.exports.connect = () => new Promise((resolve, reject) => {
    mongoose.connect(config.development.db.url ,{dbName: config.development.db.dbName, useUnifiedTopology: true,useNewUrlParser : true })
    .then((db) => {
        resolve(db)
        connection = db;
    }).catch(err => {
        console.log(err)
        // Always hard exit on a database connection error
        reject(err)
        process.exit(1);
    })
});

module.exports.get = () => {
    if(!connection) {
        throw new Error('Connect db first');
    }

    return connection;
}