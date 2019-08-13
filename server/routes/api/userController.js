var User = require("../../models/User");
const passport = require("passport")
const LocalStrategy = require("passport-local")

module.exports = (app) => {

    app.post("/api/users/signup", async (req, res, next) => {
        const {
            username,
            firstName,
            lastName,
            password
        } = req.body

        let email = req.body.email.toLowerCase();

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

        try {
            const checkEmail = await User.find({ email });
            const checkUsername = await User.find({ username });
            if (checkEmail.length > 0) {
                return res.send({
                    success: false,
                    message: "Email is already in use"
                })
            }
            if (checkUsername.length > 0) {
                return res.send({
                    success: false,
                    message: "Email is already in use"
                })
            }
        } catch (e) {
            return res.send({
                success: false,
                message: "Error finding user"
            })
        }

        const newUser = new User();

        newUser.email = email.toLowerCase();
        newUser.username = username;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        
        try {
            const user = await newUser.save();
            req.login(user, function (err) {
                return res.send({
                    success: true,
                    message: "User Signed Up"
                })
            })
        } catch (e) {
            return res.send({
                success: false,
                message: "failed to save user"
            })
        }
    })

    app.post("/api/users/login", async (req, res, next) => {
        const {
            username,
            password
        } = req.body

        const email = req.body.email.toLowerCase();

        const user = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        })

        user ? req.login(user, function (err) {
            res.send({
                success: true,
                message: "Successful Login",
                user: req.user
            })
        }) : res.send({
            success: false,
            message: err ? "Something went wrong logging in, Try again" : "No user found"
        })


    })

    app.get("/api/users/authenticate", (req, res, next) => {
        res.send({
            authenticated: req.user ? true : false,
            user: req.user ? req.user : null
        })
    })

    app.get("/api/users/logout", (req, res, next) => {
        req.logout()

        res.send({
            loggedOut: true
        })
    })

    passport.use(new LocalStrategy(
        function (email, username, password, done) {
            User.findOne({
                $or: [
                    { email: email },
                    { username: username }
                ]
            }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.validPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}