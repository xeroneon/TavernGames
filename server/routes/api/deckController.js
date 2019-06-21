var User = require("../../models/User");
var Deck = require("../../models/Deck");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mtg = require('mtgsdk');


module.exports = (app) => {
    app.post("/api/deck/create", (req, res, next) => {

        User.findOne({ _id: req.user._id })
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
                    success: true,
                    id: newDeck._id
                })
            })
    })

    app.post("/api/deck/all", (req, res, next) => {
        User.findOne({ _id: req.user._id })
            .populate('decks')
            .exec((err, user) => {
                if (user.decks) {
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

    app.get("/api/deck/:id", (req, res, next) => {
        const id = req.params.id;
        
        Deck.findOne({ _id: id })
        .exec((err, deck) => {
            
            const testPromise = new Promise((resolve, reject) => {
                let cardList = [];
                let count = 0;
                    for (let i = 0; i < deck.cards.length; i++) {
                        mtg.card.where({ id: deck.cards[i] })
                        .then(card => {
                            cardList.push(card[0])
                            count++
                            console.log(card)
                            if (count === deck.cards.length) {
                                resolve({
                                    deck: deck,
                                    cardList: cardList
                                })
                            }
                        })

                    }
                }).then(value => {
                    res.send({
                        success: true,
                        deck: value.deck,
                        cardList: value.cardList
                    })
                })

            })
    })

    app.post("/api/deck/addcard", (req, res, next) => {
        User.findOne({ _id: req.user._id })
            .exec((err, user) => {
                Deck.findOne({ _id: req.body.deckId })
                    .exec((err, deck) => {
                        console.log(deck, req.deckId)
                        deck.cards.push(req.body.cardId)

                        deck.save(err => {
                            if (err) {
                                res.send({
                                    success: false,
                                    message: "Problem saving deck, Try again"
                                })
                            }

                            else {
                                res.send({
                                    success: true,
                                    message: "Card added"
                                })
                            }
                        })
                    })
            })
    })

}