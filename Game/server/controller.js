const db = require('./db.json')


module.exports = {

postStats: (req, res) => {
    const { stats } = req.body
        db.push(stats)
        res.status(200).send(db)
},
deleteStats: (req, res) => {
    const { index } = req.params
    db.splice(index, 1)
    res.status(200).send(db)
}}
