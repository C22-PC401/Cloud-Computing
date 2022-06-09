const db = require('../models')
const Report = db.report

exports.findAll = (req, res) => {
    Report.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error While Retrieving Data"
        })
    });
}

exports.create = (req, res) => {
    const rprt = new Report({
        name: req.body.name,
        birth: req.body.birth,
        phone: req.body.phone,
        address: req.body.address,
        accident_date: req.body.accident_date,
        harrasment_type: req.body.harrasment_type,
        location: req.body.location,
        description: req.body.description
    })

    rprt.save(rprt)
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

    Report.findById(id)
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

    Report.findByIdAndUpdate(id, req.body)
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

    Report.findByIdAndRemove(id)
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