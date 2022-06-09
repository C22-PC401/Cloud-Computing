module.exports = (app) => {
    const report = require('../controllers/report.controller')
    const router = require('express').Router()

    router.get('/', report.findAll)
    router.post('/', report.create)
    router.get('/:_id', report.findOne)
    router.put('/:_id', report.update)
    router.delete('/:_id', report.delete)

    app.use('/api/report', router)
}