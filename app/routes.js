// need to do put and delete
module.exports = function(app, passport, db, objectId) {
//Bieeg Func from server
//split from server (2nd part)
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });
    app.get('/home', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('home.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    //loading 

// message board routes ===============================================================
//create method
    // app.post('/messages', (req, res) => {
    //   db.collection('messages').save({
    //     //req.body is the request from the body. The types are name and msg
    //     name: req.body.name,
    //     msg: req.body.msg,
    //     age: req.body.age,
    //     // userId: req.user._id, saves user id so you can find specific user's information
    //     thumbUp: 0, 
    //     thumbDown:0
    //   }, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/profile')
    //   })
    // })
// thumbs up and thumbs down logic
// puts and deletes are main js only / fetch
    app.put('/wins', (req, res) => {
      db.collection('users')
      .findOneAndUpdate({
        //looking for
        _id: objectId(req.user._id),
      }, {
        //the do
        //delete everything and put this here
        $set: {
          local:{
            name: req.user.local.name,
            email: req.user.local.email,
            password: req.user.local.password,
            win: req.body.wins + 1,
            loss: req.user.local.loss
          }
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/loss', (req, res) => {
      db.collection('users')
      .findOneAndUpdate({
        _id: objectId(req.user._id),
      }, {
        $set: {
          local: {
            name: req.user.local.name,
            email: req.user.local.email,
            password: req.user.local.password,
            win: req.user.local.win,
            loss: req.body.loss + 1
          }
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
