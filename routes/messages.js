const express = require('express')
const router = express.Router()
const Message = require('../model/messages')

router.get('/', (req, res, next) => {
  Message.find({}).sort({_id:-1}).limit(20).exec((err, msgs) => {
    if (err) {
        res.status(500).send({error: "Could not fetch messages"})
    } else {
        res.json(msgs)
    }
  })
})

module.exports = router
