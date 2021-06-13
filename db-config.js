const mongoose = require('mongoose');
const config = require('./config');
//var connDB = "mongodb+srv://anant1:Admin@cluster553.oap06.gcp.mongodb.net/test"

let connection = null;

module.exports.connect = () => new Promise((resolve, reject) => {
    mongoose.connect(config.development.db.url ,{dbName: config.development.db.dbName,useNewUrlParser : true, socketTimeoutMS : 1800000 })
    .then((db) => {
        resolve(db)
        connection = db;
    }).catch(err => {
        console.log(err)
        //hard exit on a database connection error
        reject(err)
        process.exit(1);
    })
    mongoose.connection.on('disconnected', err => {
        console.log("DB disconnected - " , err);
      });
});

module.exports.get = () => {
    if(!connection) {
        throw new Error('Connect db first');
    }

    return connection;
}