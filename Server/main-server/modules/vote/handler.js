const blockChain = require("../blockchain")
const jwt = require('jsonwebtoken')
const userHandler = require('../user/handler')
const keypair = require('keypair');
const p2p = require("../p2p")

const getVotes = (userId) => {
    let blocks = blockChain.get()
    let result = {}
    blocks.forEach((block, index) => {
        let decodeData = jwt.decode(block.data.encodeData)

        let voteId = decodeData.vote.voteId
        if (decodeData.vote && decodeData.vote.voteId == voteId) {
            if (decodeData.type == "CREATE_VOTE") {
                result[voteId] = { host: decodeData.user, vote: decodeData.vote }
            }

            if (decodeData.type == "VOTE") {
                let option = result[voteId].vote.options.findOne(option => option.id == decodeData.vote.optionId)
                if (option) { option.voted++ }
            }
        }
    })

    result = Object.values(result)
    result = result.filter(item => item.host.userId == userId || item.vote.voters.includes(userId) || item.vote.voter == "all")
    return result
}

const getVote = (voteId) => {
    let blocks = blockChain.get()
    let result = {}

    blocks.forEach(block => {
        let decodeData = jwt.decode(block.data.encodeData)
        if (decodeData.vote && decodeData.vote.voteId == voteId) {
            if (decodeData.type == "CREATE_VOTE") {
                result = { host: decodeData.user, vote: decodeData.vote }
            }

            if (decodeData.type == "VOTE") {
                let option = result.vote.options.findOne(option => option.id == decodeData.vote.optionId)
                if (option) { option.voted++ }
            }
        }
    })

    return result
}

const createVote = async (userId, privateKey, vote) => {
    let user = await userHandler.getUser(userId)
    if (!user) {
        return Promise.reject(`UserId ${user.userId} doesn't exist!`)
    }

    if (!userHandler.isMatchPrivatePublicKey(privateKey, user.publicKey)) {
        return Promise.reject(`Private key is wrong. Please try again!`)
    }

    let publicKey = user.publicKey
    delete user.publicKey
    let data = {
        encodeData: jwt.sign({ user, type: "CREATE_VOTE", vote }, privateKey, { algorithm: 'RS256' }),
        publicKey
    }

    checkVoteValid(vote, "CREATE_VOTE")

    p2p.broadcastMineBlock(data)
}

const vote = (userId, privateKey, vote) => {
    let user = await userHandler.getUser(userId)
    if (!user) {
        return Promise.reject(`UserId ${user.userId} doesn't exist!`)
    }

    if (!userHandler.isMatchPrivatePublicKey(privateKey, user.publicKey)) {
        return Promise.reject(`Private key is wrong. Please try again!`)
    }


    let publicKey = user.publicKey
    delete user.publicKey
    let data = {
        encodeData: jwt.sign({ user, type: "CREATE_VOTE", vote }, privateKey, { algorithm: 'RS256' }),
        publicKey
    }

    checkVoteValid(vote, "VOTE")

    p2p.broadcastMineBlock(data)
}

const checkVoteValid = (vote, type) => {
    if (type != "VOTE" && type != "CREATE_VOTE") {
        throw "INVALID VOTE TYPE"
    }

    if (type == "CREATE_VOTE") {
        if (!vote.options || !isArray(vote.options)) throw "INVALID OPTIONS"
        if (!vote.voteId) throw "MISSING VOTEID"
        if (!vote.topic) throw "MISSING TOPIC"
        if (!vote.fromDate) throw "MISSING FROM_DATE"
        if (!vote.toDate) throw "MISSING TO_DATE"
        if (!vote.voters || !isArray(voters)) throw "INVALID VOTERS"
    }

    if (type == "VOTE") {
        if (!vote.optionId) throw "MISSING OPTION_ID"
        if (!vote.voteId) throw "MISSING VOTEID"
        if (!voteTime) throw "MISSING VOTE_TIME"

        let blocks = blockChain.get()
        for (index = 1; index < blocks.length; index++) {
            let decodeData = jwt.decode(block.data.encodeData)
            if (decodeData.type == "CREATE_VOTE" && decodeData.vote.voteId == vote.voteId && vote.voteTime > decodeData.vote.toDate && vote.voteTime < decodeData.vote.fromDate) {
                throw "Out of time to vote!"
            }
        }
    }
}

module.exports = {
    getVotes,
    getVote,
    createVote,
    vote
}