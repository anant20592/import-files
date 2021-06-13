const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileDetailSchema = new Schema({
    _id : {type : mongoose.Types.ObjectId, required : [true,'_id is required, got {VALUE}']},
    file_name : {type : String , required : [true,'file name is required ,got {VALUE}']},
    date_uploaded : {type : Date, default : Date.now, required : [true,'upload date is required, got {VALUE}']},
    status : {type : String , required : [true, 'status is required, got {VALUE}']}
})

module.exports = mongoose.model('filedetails',fileDetailSchema, 'filedetails')