const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const app = express();
const {ensureAuthenticated}= require('../helpers/auth');

// Load User Model
require('../models/ShoutOut');
const ShoutOut = mongoose.model('ShoutOuts');
router.post('/Shoutout',(req,res)=>{
    let anonymous;
    if(req.body.IsAnonymous==='on'){
         anonymous=true;
    }else{
         anonymous=false;
    }

const NewQuestion=new ShoutOut({
    Question:req.body.question,
    User_id:req.user.id,
    UserName:req.user.fname+' '+req.user.lname,
    IsAnonymous:anonymous

})
NewQuestion.save().then(item=>{
    console.log("shoutout saved");
    res.redirect('../users/home')
})


})


module.exports = router;
