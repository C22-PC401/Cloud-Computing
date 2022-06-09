const { community } = require('../models')

module.exports = (app) => {
    const report = require('../controllers/report.controller')
    const information = require('../controllers/information.controller')
    const community = require('../controllers/community.controller')
    const router = require('express').Router()

    // report fiture
    router.get('/reports', report.findAll)
    router.post('/reports', report.create)
    router.get('/reports/:_id', report.findOne)
    router.put('/reports/:_id', report.update)
    router.delete('/reports/:_id', report.delete)

    // information fiture
    router.get('/informations', information.findAll)
    router.post('/informations', information.create)
    router.get('/informations/:_id', information.findOne)
    router.put('/informations/:_id', information.update)
    router.delete('/informations/:_id', information.delete)

    // community fiture
    router.get('/communities', community.findAll)
    router.post('/communities', community.create)
    router.get('/communities/:_id', community.findOne)
    router.put('/communities/:_id', community.update)
    router.delete('/communities/:_id', community.delete)

    app.use('/api', router)
}