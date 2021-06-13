const express = require('express');
const app = express();
const db = require('./db-config');
const config = require('./config');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(cors())
app.use(require('./routes'));
db
.connect()
.then(() => console.log("Database connected"))
.then(() => {
  app.listen(config.development.port)
})
.catch(err => console.log(err))

// app.get('/',(req,res) => {
//     res.send("Hello World")
// })


//http.createServer(app).listen(3000)