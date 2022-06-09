const db = require('../models')
const Information = db.information

exports.findAll = (req, res) => {
    Information.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error While Retrieving Data"
        })
    });
}

exports.create = (req, res) => {
    const info = new Information({
        title: req.body.title,
        body: req.body.body,
        source: req.body.source,
        event_date: req.body.event_date,
        event_time: req.body.event_time,
        location: req.body.location
    })

    info.save(info)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error While Add Data"
        })
    });
}

exports.findOne = (req, res) => {
    const id = req.params._id

    Information.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error While Show Data"
        })
    });
}

exports.update = (req, res) => {
    const id = req.params._id

    Information.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Data Not Found"
            })
        }

        res.send({
            message: "Data was Updated"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error While Update Data"
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params._id

    Information.findByIdAndRemove(id)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Data Not Found"
            })
        }

        res.send({
            message: "Data was Deleted"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error While Delete Data"
        })
    });
}