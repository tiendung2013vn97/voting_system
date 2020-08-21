const express = require("express")
const router = new express.Router()
const handler = require('./handler')
const suc = require('../response/success')
const fail = require('../response/fail')

/**
 * Get all votes
 */
router.get("/", (req, res, next) => {
    return handler.getVotes(req.body.userId)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err + "")))
})

/**
 * Create new vote
 */
router.post("/", (req, res, next) => {
    let { userId, privateKey, vote } = { ...req.body }
    return handler.createVote(userId, privateKey, vote)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err + "")))
})


module.exports = router