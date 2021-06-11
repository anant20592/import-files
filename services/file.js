const fileModal = require('../models/File.js');

exports.importFile = (req,res) => {
    let file = new fileModal({name : 'anantss'})
    return file.save()
}
