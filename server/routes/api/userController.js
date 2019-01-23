var User = require("../../models/User");

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
                return res.send({
                    success: true,
                    message: "user signed up"
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
            if (user) {
                //continue passport video
            } //user already exists with email AND/OR username.
            else {} //no users with that email NOR username exist.
        });


    })
}