const express = require('express');
const route =  express.Router();
const {importFile,fetchFileList,getJobById,getJobByStatus,checkStatus,getContentByJobId} = require('../services/file');

route.post('/save', (req,res) => {
    console.log("==== File ====== " , req.files)
    if (!req.files){
        return res.json({success : 'false' , msg : "Not a file"});
    }
    importFile(req.files.myFile)
    .then(data => {
        res.json({success : 'true' , data : data})
    }).catch(err => res.json({success : 'false' , err : err}))
})

route.get('/files', (req,res) => {
    fetchFileList()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        console.log(err); 
        res.json({success : 'false', err : err})
    })
})

route.get('/poll-status', (req,res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    
        // enabling CORS
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers":
        //   "Origin, X-Requested-With, Content-Type, Accept",
      })
      setInterval(() => {
        checkStatus()
        .then(data => {
            res.write(`data: ${JSON.stringify({success : 'true',data : data})}\n\n`)
        }).catch(err => {console.log(err); res.write(`data: ${JSON.stringify({success : 'false', err : err})}\n\n`)})
        
      }, 5000)

    //   req.on('close', (err) => {
    //     clearInterval();
    //     res.end();
    //     })
})


route.get('/job/:id', (req,res) => {
    let jobId = req.params.id;
    getJobById(jobId)
    .then(data => {
        console.log(`====== Job details with id: ${jobId} ===== ` , data)
        res.json({success : 'true', data: data})
    }).catch(err => {
        console.log(`===== Error while fetching job details with id : ${jobId} ==== `, err)
        res.json({success : false, err : err})
    })
})


route.get('/job', (req,res) => {
    let status = req.query.status;
    getJobByStatus(status)
    .then(data => {
        console.log(`====== Job details with status: ${status} ===== ` , data)
        res.json({success : 'true', data: data})
    }).catch(err => {
        console.log(`===== Error while fetching job details with status : ${status} ==== `, err)
        res.json({success : false, err : err})
    })
})

route.get('/file-content/:id', (req,res) => {
    let jobId = req.params.id;
    getContentByJobId(jobId)
    .then(data => {
        res.json({success : 'true' , data : data})
    }).catch(err => res.json({success : 'false' , err : err}) )
})
module.exports = route