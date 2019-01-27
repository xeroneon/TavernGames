var User = require("../../models/User");
const passport = require("passport")
const LocalStrategy = require("passport-local")

module.exports = (app) => {

    app.post("/api/users/signup", (req, res, next) => {
        const {
            username,
            firstName,
            lastName,
            password
        } = req.body

        let { email } = req.body;

        if (!username) {
            return res.send({
                success: false,
                message: 'Error: Missing username'
            });
        }
        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: Missing first name'
            });
        }
        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Missing last name'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Missing email'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Missing password'
            });
        }

        User.find({
            email: email.toLowerCase()
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error finding user"
                })
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: "Email is already in use"
                })
            }
        })

        User.find({
            username: username
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error finding user"
                })
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: "Username is already taken"
                })
            }
        })

        const newUser = new User();

        newUser.email = email.toLowerCase();
        newUser.username = username;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);

        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "failed to save user"
                })
            } else {
                req.login(user, function(err) {
                    return res.send({
                        success: true,
                        message: "User Signed Up"
                    })
                })
            }
        })
    })

    app.post("/api/users/login", (req, res, next) => {
        const {
            username,
            password
        } = req.body

        const email = req.body.email.toLowerCase();

        User.findOne({$or: [
            {email: email},
            {username: username}
        ]}).exec(function(err, user){
            if(err) {
                return res.send({
                    success: false,
                    message: "Something went wrong logging in, Try again"
                })
            }
            if (user) {
                //continue passport video
                req.login(user, function(err) {
                    return res.send({
                        success: true,
                        message: "Successful Login",
                        user: req.user
                    })
                })
            } //user already exists with email AND/OR username.
            else {
                return res.send({
                    success: false,
                    message: "No user found"
                })
            } //no users with that email NOR username exist.
        });


    })

    app.get("/api/users/authenticate", (req,res, next) => {
        console.log(req.user)

        if (req.user) {
            return res.send({
                authenticated: true,
                user: req.user
            })
        } else {
            return res.send({
                authenticated: false
            })
        }
    })

    app.get("/api/users/logout", (req, res, next) => {
        req.logout()

        res.send({
            loggedOut: true
        })
    })

    passport.use(new LocalStrategy(
        function(email, username, password, done) {
          User.findOne({$or: [
            {email: email},
            {username: username}
        ]}, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
       
      passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });
}