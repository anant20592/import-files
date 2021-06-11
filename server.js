const express = require('express');
const app = express();
const db = require('./db-config');
const bodyParser = require('body-parser');
const config = require('./config');

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(require('./routes'));
db
.connect()
.then(() => console.log("Database connected"))
.then(() => {
  app.listen(config.development.port)
})
.catch(err => console.log(err))

app.get('/',(req,res) => {
    res.send("Hello World")
})


//http.createServer(app).listen(3000)