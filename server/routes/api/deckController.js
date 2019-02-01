var User = require("../../models/User");
var Deck = require("../../models/Deck");
const passport = require("passport")
const LocalStrategy = require("passport-local")

module.exports = (app) => {
    app.post("/api/deck/create", (req,res,next) => {

        User.findOne({_id: req.user._id})
            .exec((err, user) => {
                const newDeck = new Deck();
                newDeck.title = req.body.title;
                newDeck.user = user._id
                newDeck.save();

                user.decks.push(newDeck._id)
                user.save(err => {
                    if (err) return console.log(err);
                })

                res.send({
                    success: true
                })
            })
    })

    app.post("/api/deck/all", (req,res,next) => {
        User.findOne({_id: req.user._id})
            .populate('decks')
            .exec((err, user) => {
                if(user.decks) {
                    res.send({
                        decks: user.decks
                    })
                } else {
                    res.send({
                        decks: []
                    })
                }
            })
    })

}