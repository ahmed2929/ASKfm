const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const app = express();
const {ensureAuthenticated}= require('../helpers/auth');

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// user profile routes
router.get('/profile/:id',(req,res)=>{
  //to check whos page is this
  if(req.isAuthenticated())
  {
    if(req.user.id===req.params.id)
    {

      User.findOne({_id:req.params.id}).then(user=>
        {
          if(!user)
          {
            console.log("user Not found");
            /*render to error page*/
          }
          else {
            console.log(req.user.id);
            res.render('profile.ejs',{myuser:user});
          }

        });
      }
      else {
        User.findOne({_id:req.params.id}).then(user=>
          {
            if(!user)
            {
              console.log("user Not found");
              /*render to error page*/
            }
            else {
              console.log(req.user.id);
              res.render('profile.ejs',{myuser:user});
            }

          });

  }
}
  else {

  }
});

router.post('/profile/auth/:id',(req,res,next)=>
{
  User.findOne({_id:req.params.id}).then(resever=>
  {
    resever.rques.push({from_id:req.user.id,question:req.body.ques});
    resever.save();
    User.findOne({_id:req.user.id}).then(sender=>{
      sender.sques.push({to_id:req.params.id,question:req.body.ques});
      sender.save();
    }).catch(err=>
    {
      if(err)console.log("error in sender");
    });

  }).catch(err=>{
    if(err)console.log("error in resever");
  });
  res.send("sended");
});
// User Login Route
router.get('/login', (req, res) => {
  if(!req.isAuthenticated()){
    res.render('users/login');
  }else{
    res.redirect('../users/home')

  }

});

// User Register Route
router.get('/register', (req, res) => {
  if(!req.isAuthenticated()){
    res.render('users/register');
  }else{
    res.redirect('../users/home')

  }

});

// Login Form POST
router.post('/login', (req, res, next) => {
  console.log("entered post login")
  passport.authenticate('local', {
    successRedirect:'../users/home',
    failureRedirect: '/users/login',
    failureMessage:true,
    failureFlash: true
  })(req, res, next);
},(req,res,nexr)=>{
  req.flash('error_msg', 'invalid user name or password');
});

// Register Form POST
router.post('/register', (req, res) => {
  let errors = [];
  console.log("entered the post")


  if(req.body.password.length < 4){
    errors.push({text:'Password must be at least 4 characters'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,

    });
  } else {
    console.log("no err and has to save db")
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already regsitered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            pnumber: req.body.pnumber
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
  }
});

router.get('/home',ensureAuthenticated,(req,res)=>{
  res.render("home");
})

// Logout User
router.get('/logout',ensureAuthenticated, (req, res) => {

  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
