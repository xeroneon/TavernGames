const mtg = require('mtgsdk');

module.exports = (app) => {
    app.post("/api/card/search", (req, res, next) => {
        console.log(req.body.name);

        const pattern = new RegExp(`.*${req.body.name}`)

        mtg.card.where({ name: req.body.name, pageSize: 50})
            .then(cards => {
                res.send({
                    cards
                })
            })
    })

}