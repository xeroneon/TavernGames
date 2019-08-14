const User = require("../../models/User");
const Deck = require("../../models/Deck");
const Card = require("../../models/Card");

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
            const deck = await Deck.findOne({ _id: id }).populate("cards");
            console.time()
            // const cardList = await Promise.all(deck.cards.map(card => {
            //     return mtg.card.where({ id: card });
            // }))
            console.timeEnd();
            return res.send({
                cardList: deck.cards
            })
        }

        catch (e) {
            console.log(e)
        }
    })

    app.post("/api/deck/addcard", async (req, res, next) => {
        try {
            // const user = await User.findOne({ _id: req.user._id });
            const deck = await Deck.findOne({ _id: req.body.deckId });
            const privateCard = await Card.findOne({ id: req.body.cardId });
            // console.log("Private Card: ", privateCard);
            if (privateCard === null) {
                const sdkCard = await mtg.card.find(req.body.cardId)
                // console.log(sdkCard);
                const newCard = new Card({ ...sdkCard.card });
                // console.log("New Card: ", newCard);
                newCard.decks.push(deck._id);
                await newCard.save();
                deck.cards.push(newCard._id);
            } else {
                deck.cards.push(privateCard._id);
            }
            await deck.save()
            res.send({
                success: true,
                message: "Card added"
            })
        }
        catch (e) {
            console.log(e)
        }
    })

}