export const errorHandler = (err, req, res, next) => {
        console.log(err.stack)
        return res.status(err.status || 500).send({ success: false, message: err.message || `SERVER ERROR` })
}