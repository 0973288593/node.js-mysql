const express = require('express')
const mysql = require('mysql')


//create connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'nodemysql'
});

//connection to mysql
db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('MySQL Connection')
});
const app = express()

//create Database สร้างชื่อฐานข้อมูล
app.get("/createdb",(req,res) => {
    let sql ='CREATE DATABASE nodemysql'
    db.query(sql,(err) => {
        if(err) {
            throw err
        }
        res.send('Database Created')
    });
});

//create Table
app.get('/createemployee',(req,res) =>{
    let sql ='CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql ,(err) => {
        if(err) {
            throw err
        }
        res.send('Employee table created')
    });
});

//insert employee

app.get('/employeel',(req,res) => {
    let post = {name:'Jake Smith', designation: 'chief Executive officer'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err => {
        if(err) {
            throw err
        }
        res.send('Employee added')
    })
})

//select wmployee

app.get('/getemployee',(req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err,results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send('Employee details fethed')
    })
})

//uodate employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'updated name'
    let sql = `UPDATE employee SET name = '${newName}'  WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee updated')
    })
})

//delete employee
app.get('/deleteemployee/:id',(req,res)=>{
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql,err => {
        if (err) {
            throw err
        }
        res.send('Employee deleted')
    })
})

app.listen('3000',() => {
    console.log('Server started on port 3000')
});

