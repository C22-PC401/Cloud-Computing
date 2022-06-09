const db = require('../models')
const Community = db.community

exports.findAll = (req, res) => {
    Community.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error While Retrieving Data"
        })
    });
}

exports.create = (req, res) => {
    const info = new Community({
        community_name: req.body.community_name,
        join: req.body.join ? req.body.join: false
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

    Community.findById(id)
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

    Community.findByIdAndUpdate(id, req.body)
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

    Community.findByIdAndRemove(id)
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