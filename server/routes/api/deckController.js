var User = require("../../models/User");
var Deck = require("../../models/Deck");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mtg = require('mtgsdk');


module.exports = (app) => {
    app.post("/api/deck/create", async (req, res, next) => {

        const user = await User.findOne({ _id: req.user._id });
        const newDeck = new Deck();
        newDeck.title = req.body.title;
        newDeck.user = user._id
        newDeck.save();

        user.decks.push(newDeck._id)
        user.save(err => {
            if (err) return console.log(err);
        })

        res.send({
            success: true,
            id: newDeck._id
        })
    })

    app.post("/api/deck/all", async (req, res, next) => {
        // User.findOne({ _id: req.user._id })
        //     .populate('decks')
        //     .exec((err, user) => {
        //         if (user.decks) {
        //             res.send({
        //                 decks: user.decks
        //             })
        //         } else {
        //             res.send({
        //                 decks: []
        //             })
        //         }
        //     })

        try {
            const user = await User.findOne({ _id: req.user._id }).populate('decks');

            res.send({
                decks: user.decks ? user.decks : []
            })
        } catch (e) {
            console.log(e)
        }
    })

    app.get("/api/deck/:id", async (req, res, next) => {
        const id = req.params.id;
        try {
            const deck = await Deck.findOne({ _id: id });
            console.time()
            const cardList = await Promise.all(deck.cards.map(card => {
                return mtg.card.where({ id: card });
            }))
            console.timeEnd();
            res.send({
                cardList
            })
        }

        catch (e) {
            console.log(e)
        }
    })

    app.post("/api/deck/addcard", async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user._id });
            const deck = await Deck.findOne({ _id: req.body.deckId });
            deck.cards.push(req.body.cardId);
            deck.save(err => {
                res.send({
                    success: err ? false : true,
                    message: err ? "Problem saving deck, Try again" : "Card added"
                })
            })
        }
        catch (e) {
            console.log(e)
        }
    })

}