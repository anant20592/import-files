const express = require('express');
const route =  express.Router();
const {importFile} = require('../services/file');

route.post('/save-file', (req,res) => {
    importFile(req.body)
    .then(id => {
        console.log(id)
        res.send({id })
    })
    .catch(err => {
        console.log(err)
        res.send({name : "error"})
    })
    
})

route.get('file-list', (req,res) => {

})


module.exports = route