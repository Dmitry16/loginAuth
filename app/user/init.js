const passport = require('passport')
const { check, validationResult } = require('express-validator/check');
const User = require('./model')

// console.log('User', User)

function initUser (app) {
  app.get('/', renderWelcome)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/register'
  }))
  app.get('/register', renderRegister)

  app.post('/registerUser', 
    // [
    //   check('username').isLength({ min: 2 }),
    //   check('password').isLength({ min: 5 })
    // ]
    function(req, res){
      registerUser(req.body.username, req.body.password)
      // console.log(req.body)
    }
  )
}

function renderRegister(req, res){
  res.render('user/register')
}

function registerUser(username, password){

  const newUser = new User({
      username: username,
      password: password
  })

  console.log('newUser', newUser)

  User.createUser(newUser, function(err, user){
    if (err) console.log('errorrrr!!!', err.errmsg)
    console.log('saved user::', user)
  })

}

function renderWelcome (req, res) {
  res.render('user/welcome')
}

function renderProfile (req, res) {
  res.render('user/profile', {
    username: req.user.username
  })
}

module.exports = initUser
