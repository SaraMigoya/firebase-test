
const { Router}= require('express');
const router = Router();
const admin = require('firebase-admin')
require('dotenv').config()
var serviceAccount = require("../../node-firebase-test-fb4db-firebase-adminsdk-4k1nh-1ed50eebfa.json");
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL
})

const db = admin.database()

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot)=>{
        const data = snapshot.val()
        res.render('index', {contacts: data})
    })

})

router.post('/new-contact', (req,res) =>{
    console.log(req.body)
    
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone:req.body.phone
    }
    db.ref('contacts').push(newContact)

    res.redirect('/')

})

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});
module.exports = router;