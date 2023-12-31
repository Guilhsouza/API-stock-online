const validateBodyReq = (schemaJoi) => async (req, res, next) => {
    try {
        await schemaJoi.validateAsync(req.body)
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = validateBodyReq