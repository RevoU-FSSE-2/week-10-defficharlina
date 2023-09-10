const { Router } = require('express')
const { getAllTransfer, createTransfer, approveTransfer } = require('../controller/transferController')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const transferRouter = Router()

transferRouter.get('/', getAllTransfer)
transferRouter.post('/', /*authorizationMiddleware,*/ createTransfer)
transferRouter.put('/:id', authorizationMiddleware, approveTransfer)

module.exports = transferRouter