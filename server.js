var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var passport = require('passport');
var session = require('express-session');
// have to pass on a Store object on to the session
var SequelizeStore = require('connect-session-sequelize')(session.Store);
// using local strategy, and setting it up here to give options.
var mysql = require('mysql');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('underscore');
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db);

// this is used to sync the data
var models = require('./models');
var db = models.sequelize;

db.sync();

var app = express();
app.use(express.static('public'));

// passport.serializeUser(function(user,done){
//   done(null, user);
//  });

// passport.deserializeUser(function(obj,done){
//   done(null, obj);
//  });

// module.exports = 
// passport.use('local', new LocalStrategy(
//   function(username, password, done){
//     models.User.findOne({ where: {username: username}}).then(function(user){
//         if (!user){
//           return done(null, false, {message: 'Incorrect Username'});
//         }
//         if (!bcrypt.compareSync(password, user.get('password_hash'))){
//           return done(null, false, {message: 'incorrect password'});
//         }
//         return done(null, user)
//       });
//     }
// ));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(cookieParser())
// app.use(session({
//  secret: 'jobtroll is the ticket to success',
//   store: new SequelizeStore({
//    db: db
//  }),
//  resave: true,
//  saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/home', middleware.requireAuthentication, function (req, res){
      models.User.findOne({ where: {id: req.user.get('id')}}).then(function(currentUser){
        currentUser.getDreams().then(function(dreams){
          var enteredDreams = [];

          dreams.forEach(function(dream){
            enteredDreams.push(dream);
          })
        var data = {
          currentUser: currentUser,
          dreams: enteredDreams
        }
        res.json(data);
      });
   });
});

app.post('/users/login', function (req, res) {
  var body = _.pick(req.body, 'username', 'password');
  var userInfo;

  models.User.authenticate(body).then(function (user) {
    var token = user.generateToken('authentication');
    userInfo = user;

    return models.Token.create({
      token: token
    });
  }).then(function (tokenInstance) {
    res.header('Auth', tokenInstance.get('token')).json(userInfo.toPublicJSON());
  }).catch(function () {
    res.status(401).send();
  });
});

app.delete('/users/login', middleware.requireAuthentication, function (req, res) {
  req.token.destroy().then(function () {
    res.status(204).send();
  }).catch(function () {
    res.status(500).send();
  });
});


app.post('/users/create', function(req,res){
    models.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(success) {
      res.json(success);
    }).catch(function(err){
      res.json(err);
    });
});

  app.post('/dream/create', middleware.requireAuthentication, function(req, res){
        models.Dream.create({
            title: req.body.title,
            description: req.body.description,
            active: false
        }).then(function(dream){
        req.user.addDream(dream).then(function(success){
        res.json(dream);
      }).catch(function(err){
        throw err;
      });
    })
});

app.put('/dream/delete/:id', middleware.requireAuthentication, function(req, res){
  models.User.findOne({where: {id: req.user.get('id')}}).then(function(){
    models.Dream.update(
    {
      active: true
    },
    {
    where: {
        id: req.params.id
      }
    }).then(function(success){
      res.json(success);
    }).catch(function(err){
      throw err;
    })
  })
})

var PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log('database operation on port: ' + PORT);
});