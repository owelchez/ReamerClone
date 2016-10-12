var express = require('express');
var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var mysql = require('mysql');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('underscore');
var bcrypt = require('bcryptjs');

// this is used to sync the data
var models = require('../models');
var app = express();

passport.serializeUser(function(user,done){
  done(null, user);
 });

passport.deserializeUser(function(obj,done){
  done(null, obj);
 });

passport.use('local', new LocalStrategy(
  function(username, password, done){
    models.User.findOne({ where: {username: username}}).then(function(user){
        if (!user){
          return done(null, false, {message: 'Incorrect Username'});
        }
        if (!bcrypt.compareSync(password, user.get('password_hash'))){
          return done(null, false, {message: 'incorrect password'});
        }
        return done(null, user)
      });
    }
));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
 secret: 'jobtroll is the ticket to success',
  store: new SequelizeStore({
   db: db
 }),
 resave: true,
 saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());