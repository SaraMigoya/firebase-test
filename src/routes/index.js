
const { Router}= require('express');
const router = Router();
const admin = require('firebase-admin')
require('dotenv').config()

admin.initializeApp({
    credential:admin.credential.applicationDefault(),
    databaseURL: process.env.DB_URL
})

const db = admin.database()

router.get('/', (req, res) => {

       res.render('index')

})

router.post('/new-contact', (req,res) =>{
    console.log(req.body)
})

module.exports = router;