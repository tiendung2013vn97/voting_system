const blockChain = require("../blockchain")
const jwt = require('jsonwebtoken')

const keypair = require('../vote/node_modules/keypair');
const p2p = require("../p2p")


const createUser = async (user) => {
    try {
        if (user.userId.toLowerCase() == "all") {
            return Promise.reject(`Please choose userId which different from "all"! `)
        }

        if (!user.userId) {
            return Promise.reject(`UserId is required!`)
        }

        if (!user.age) {
            return Promise.reject(`Age is required!`)
        }

        if (!user.gender) {
            return Promise.reject(`Gender is required!`)
        }

        let userExist = await isUserIdExist(user.userId)
        if (userExist) {
            return Promise.reject(`UserId ${user.userId} already existed!`)
        }

        var pair = keypair();
        let data = {
            encodeData: jwt.sign({ user, type: "INIT_USER" }, privateKey, { algorithm: 'RS256' }),
            publicKey: pair.public
        }

        p2p.broadcastMineBlock(data)

        await waitAddUser(user.userId)
        Promise.resolve({
            privateKey: pair.private
        })
    } catch (error) {
        Promise.reject(error)
    }
}

const login = async (user) => {
    try {
        let userExist = isUserIdExist(user.userId)
        if (!userExist) {
            return Promise.reject(`UserId ${user.userId} doesn't exist!`)
        }

        let publicKey = getPublicKey(user.userId)
        if (!isMatchPrivatePublicKey(user.privateKey, publicKey)) {
            return Promise.reject(`Private key is wrong. Please try again!`)
        }

        return Promise.resolve({ publicKey })
    } catch (error) {
        return Promise.reject(error)
    }
}

const getPublicKey = (userId) => {
    const blocks = blockChain.get()
    for (index = 1; index < blocks.length; index++) {
        let decodeData = jwt.decode(blocks[index].data.encodeData)
        if (userId == decodeData.user.userId) {
            blocks[index].data.publicKey
        }
    }
}

const isMatchPrivatePublicKey = (privateKey, publicKey) => {
    try {
        const code = jwt.sign("check", privateKey, { algorithm: 'RS256' })
        jwt.verify(code, publicKey)
        return true
    } catch (error) {
        return false
    }
}

const isUserIdExist = async (userId) => {
    let isExist = false
    await Promise.all(blockChain.get().map((block, index) => {
        if (index) {
            let decodeData = jwt.decode(block.data.encodeData)
            if (userId == decodeData.user.userId) isExist = true
        }
    }))

    return Promise.resolve(isExist)
}

const waitAddUser = (userId) => {
    return new Promise((resolve, reject) => {
        const checkUserAdded = () => {
            setTimeout(async () => {
                let userExist = await isUserIdExist(userId)
                if (!userExist) {
                    checkUserAdded()
                } else {
                    return resolve("ok")
                }
            }, 500)
        }
        checkUserAdded()
    })
}

const getUser = (userId) => {
    const blocks = blockChain.get()
    let user = null
    blocks.forEach(block => {
        let decodeData = jwt.decode(block.data.encodeData)
        if (decodeData.user.userId == userId && decodeData.type == "INIT_USER") {
            user = decodeData.user
            user.publicKey = block.publicKey
        }
    })

    return user
}

module.exports = {
    login,
    createUser,
    isUserIdExist,
    isMatchPrivatePublicKey,
    getUser
}