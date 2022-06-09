const { community } = require('../models')

module.exports = (app) => {
    const report = require('../controllers/report.controller')
    const information = require('../controllers/information.controller')
    const community = require('../controllers/community.controller')
    const user = require('../controllers/user.controller')
    const router = require('express').Router()
    const verifyToken = require('../routes/verifyToken')

    // report feature
    router.get('/reports', verifyToken, report.findAll)
    router.post('/reports', report.create)
    router.get('/reports/:_id', report.findOne)
    router.put('/reports/:_id', verifyToken, report.update)
    router.delete('/reports/:_id', verifyToken, report.delete)

    // information feature
    router.get('/informations', verifyToken, information.findAll)
    router.post('/informations', verifyToken, information.create)
    router.get('/informations/:_id', information.findOne)
    router.put('/informations/:_id', verifyToken, information.update)
    router.delete('/informations/:_id', verifyToken, information.delete)

    // community feature
    router.get('/communities', community.findAll)
    router.post('/communities', community.create)
    router.get('/communities/:_id', community.findOne)
    router.put('/communities/:_id', community.update)
    router.delete('/communities/:_id', community.delete)

    // auth
    router.get('/registers', verifyToken, user.findAll)
    router.post('/registers', user.create)
    router.post('/logins', user.createLogin)
    router.put('/registers/:_id', verifyToken, user.update)
    router.delete('/registers/:_id', verifyToken, user.delete)

    app.use('/api', router)
}