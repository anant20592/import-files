const mongoose = require('mongoose');
const fileData = require('../models/file-data');
const fileDetail = require('../models/file-details');
const {parse} = require('fast-csv');

exports.importFile = (fileToImport) => {
    return new Promise((resolve , reject) => {

        var file_id;
        var rows = [];
        
        const stream = parse({ headers: true })
        .on('error', error => console.error(error))
        .on('data', row => {
            console.log(`Valid [row=${JSON.stringify(row)}]`)
            rows.push(row);
        })
        .on('data-invalid', (row, rowNumber) => console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`))
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`)
            fileData.create({_id : new mongoose.Types.ObjectId(),file_id : file_id,data : rows},async function(err, documents) {
                if (err) throw err;
                try{
                    const doc = await fileDetail.findOne({"_id" : file_id});
                    doc.status = 'complete'
                    doc.save().then(data => {
                        console.log("======= File import completed successfully ======== ")
                    })
                }catch(err){
                    console.log(err)
                }
            });
        });
        fileDetail.create({
            _id :new  mongoose.Types.ObjectId(),
            file_name : fileToImport.name,
            date_uploaded : new Date,
            status : 'pending'
        }).then(data => {
            console.log("======= data ====== ", data)
            resolve({...data._doc, 'file_content' : []})
            file_id = data._id;
            stream.write(fileToImport.data);
            stream.end();
        }).catch(err => reject(err))
    })

}

exports.fetchFileList = function(){
    return new Promise((resolve , reject) => {
    
        fileDetail.find()
        .then(details => {
            if(details.length === 0){
                resolve([])
            }
            console.log("====== file list size ======= ",details.length)
            let fileArray = [];
            let fileListLength = details.length;
            let counter = 0;
            details.forEach(file => {
                let fileObj = {};
                fileObj['_id'] = file._id;
                fileObj['file_name'] = file.file_name;
                fileObj['date_uploaded'] = file.date_uploaded;
                fileObj['status'] = file.status;
                fileData.aggregate([
                    {$match : {file_id : mongoose.Types.ObjectId(file._id)}},
                    {$unwind : {path : '$data'}},
                    {$group : {_id : '$data.platform', total : {$sum : 1}}}
                ]).then(data => {
                    fileObj['file_content'] = data;
                    fileArray.push(fileObj)
                    ++counter
                    if(counter == fileListLength){
                        console.log(fileArray)
                        resolve(fileArray)
                        return;
                    }
                }).catch(err => console.log(err))
            })
        }).catch(err => {console.log(err)})
    })

}


exports.getJobById = function (id) {
    return new Promise((resolve , reject) => {
        let jobDetails;
        fileDetail.findById(id)
        .then(details => {
            if(details.status === 'complete'){
                jobDetails = details;
                return fileData.aggregate([
                    {$match : {file_id : mongoose.Types.ObjectId(id)}},
                    {$unwind : {path : '$data'}},
                    {$group : {_id : '$data.platform', total : {$sum : 1}}}
                ])
            }else{
                resolve(details)
                return
            } 
        })
        .then(data => {
                    resolve({...jobDetails._doc,'file_content' : data})
                    return
        }).catch(err =>{
            reject(err)
        })
    })
}

exports.getJobByStatus = function (status) {
    return new Promise((resolve , reject) => {
        let jobDetails;
        if(status.toLowerCase() != 'complete' && status.toLowerCase() != 'pending'){
            console.log("dsfdsfsdf")
            resolve([])
            return
        }
        fileDetail.find({status : status.toLowerCase()})
        .then(details => {
            if(status.toLowerCase() === 'complete'){
                return details;
            }else if(status.toLowerCase() === 'pending'){
                resolve(details)
                return
            }
        })
        .then(details => {
            let counter = 0;
            let newArray = [];
            details.forEach(file =>{
                fileData.aggregate([
                    {$match : {file_id : mongoose.Types.ObjectId(file._id)}},
                    {$unwind : {path : '$data'}},
                    {$group : {_id : '$data.platform', total : {$sum : 1}}}
                ]).then(data => {
                        ++counter;
                        let newObj = {...file._doc, 'file_content' : data}
                        newArray.push(newObj)
                        if(counter == details.length){
                            resolve(newArray)
                            return
                        }
                })
            })
        }).catch(err =>{
            reject(err)
        })
    })
}


exports.checkStatus = function(){
    return new Promise((resolve, reject) => {
        let statusObj = {}
        fileDetail.find()
        .then(data => {
            if(data.length > 0){
                data.forEach(job => {
                    statusObj[job._id] = job.status;
                })
                resolve(statusObj)
            }else{
                resolve({})
            }
        }).catch(err => reject(err))
    })
}

exports.getContentByJobId = function (id){
    return new Promise((resolve, reject) => {
        fileData.aggregate([
            {$match : {file_id : mongoose.Types.ObjectId(id)}},
            {$unwind : {path : '$data'}},
            {$group : {_id : '$data.platform', total : {$sum : 1}}}
        ])
        .then(data => {
            resolve(data)
            return
        }).catch(err => reject(err))
    })
}