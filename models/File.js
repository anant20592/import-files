const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileSchema = new Schema({
    name : {type : String , required : 'Name is required'}
})

module.exports = mongoose.model('file',fileSchema, 'files')