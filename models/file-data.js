const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fileDataSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: [true, '_id is required, got {VALUE}'] },
    file_id: { type: mongoose.Types.ObjectId, required: [true, 'file_id is required, got {VALUE}'] },
    data: [
        {
            uid: { type: String, required: [true, 'uid is required, got {VALUE}'] },
            platform: { type: String, required: [true, 'platform is required, got {VALUE}'] }
        }
    ]

})

module.exports = mongoose.model('filedata', fileDataSchema, 'filedata')