module.exports = (msg) => {
    console.log("msg:", msg)
    return {
        status: 'fail',
        error: msg + ""
    }
}