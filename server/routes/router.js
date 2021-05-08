const express = require('express');
const router = express.Router();
const db = require('../config/db');

/* GET home page. */
router.get('/api/getAlluser', (req, res, next) => {
    db.query("SELECT * FROM webcalendar.user", (err,data)=>{
        if(!err){
            res.send(data);
        }
        //if(!err) res.send(data);
        else {
            console.log("qr err: ");
            res.send(err);
        }
    })
});

router.get('/api/getschedule/:userName', (req, res, next) => {
    db.query("SELECT * FROM webcalendar.schedule where uname = ?",req.params.userName, (err,data)=>{
        if(!err){
            console.log(data);
            res.send(data);
        }
        //if(!err) res.send(data);
        else {
            console.log("qr err: ");
            res.send(err);
        }
    })
});
router.get('/api/getAllschedule', (req, res, next) => {
    db.query("SELECT * FROM webcalendar.schedule", (err,data)=>{
        if(!err){
            res.send(data);
        }
        //if(!err) res.send(data);
        else {
            console.log("qr err: ");
            res.send(err);
        }
    })
});

router.get('/api/getselect/:date', (req, res, next) => {
    db.query("SELECT * FROM webcalendar.schedule where taskdate = ?",req.params.date, (err,data)=>{
        if(!err){
            res.send(data);
        }
        //if(!err) res.send(data);
        else {
            console.log("qr err: ");
            res.send(err);
        }
    })
});

router.post('/api', (req, res, next) => {
    db.query('insert into webcalendar.schedule (uname,taskdate,tasknum) values (?, ?, ?)'
        ,[req.body.uname,req.body.taskdate,req.body.tasknum],(err,data)=>{
        if(!err){
            res.send(data);
        }
        //if(!err) res.send(data);
        else {
            console.log("qr err: ");
            res.send(err);
        }
    })
});

router.delete('/api', (req, res, next) => {
    db.query('delete from webcalendar.schedule where uname = ? AND taskdate = ? AND tasknum = ?'
        ,[req.body.uname,req.body.taskdate,req.body.tasknum],(err,data)=>{
            if(!err){
                res.send(data);
            }
            //if(!err) res.send(data);
            else {
                console.log("qr err: ");
                res.send(err);
            }
        })
});

router.post('/api/board', (req, res, next) => {
    db.query('insert into webcalendar.board (textarea) values (?)'
        ,[req.body.textarea],(err,data)=>{
            if(!err){
                console.log(req.body);
                res.send(data);
            }
            //if(!err) res.send(data);
            else {
                console.log("qr err: ");
                res.send(err);
            }
        })
});

router.delete('/api/board', (req, res, next) => {
    db.query('delete from webcalendar.board'
        ,(err,data)=>{
            if(!err){
                console.log(req.body);
                res.send(data);
            }
            //if(!err) res.send(data);
            else {
                console.log("qr err: ");
                res.send(err);
            }
        })
});
router.put('/api/board', (req, res, next) => {
    db.query('update webcalendar.board set textarea = ? where id=1',[req.body.textarea]
        ,(err,data)=>{
            if(!err){
                console.log(req.body);
                res.send(data);
            }
            //if(!err) res.send(data);
            else {
                console.log("qr err: ");
                res.send(err);
            }
        })
});
router.get('/api/board', (req, res, next) => {
    db.query("SELECT textarea FROM webcalendar.board", (err,data)=>{
        if(!err){
            res.send(data);
        }
        //if(!err) res.send(data);
        else {
            console.log("qr err: ");
            res.send(err);
        }
    })
});
module.exports = router;