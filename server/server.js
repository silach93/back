const express = require('express');
const multer = require("multer");
const path = require('path');
const cors = require('cors')
const app = express();
const port = 5555;
const base = require('../data/config')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('port', port)
app.route('/auth')
    .post((req, res) => {
        let login = req.body.login;
        let pass = req.body.pass;
        console.log(login, pass);
        base.get("SELECT * FROM users WHERE login=? AND password=?", [login, pass], function (err, result) {
            if (err) res.json({ 'error': 'mysql' })
            else if (result == undefined) res.json({ 'error': 'error' })
            else res.json({
                "message": "success",
                "data": result,
                "id": this.lastID
            })
            
        });
    })
app.route('/register')
    .post((req, res) => {
        let surname = req.body.surName
        let firstname = req.body.firstName
        let middlename = req.body.middleName
        let login = req.body.login
        let phone = req.body.phone
        let email = req.body.email
        let pass = req.body.password

        base.run("insert into users(login, password, firstname, surname, middlename, email, phone) values(?,?,?,?,?,?,?)",
            [login, pass, firstname, surname, middlename, email, phone], function (err, result) {
                if (err) {
                    res.json({ "error": err.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": result,
                    "id": this.lastID
                })
            })

    })

app.listen(app.get('port'), () => {
    console.log(`[ OK ] :: Server is running on localhost:${port}`)
})