const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();

const { registerValidation } = require('../../config/validation')
const { user } = require('../models')

exports.findAll = (req, res) => {
    User.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error While Retrieving Data"
        })
    });
}

// Register
exports.create = async (req, res) => {
    // Register Validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({
        message: error.details[0].message
    })

    // check existing email
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send({
        message: 'Email Exist!'
    })

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    user.save(user)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Error While Add Data"
        })
    });
}

// Login
exports.createLogin = async (req, res) => {
    // check existing email
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send({
        message: 'Invalid Email or Password!'
    })

    // check password
    const validPw = await bcrypt.compare(req.body.password, user.password)
    if (!validPw) return res.status(400).send({
        message: 'Invalid Email or Password!'
    })

    // jsonwebtoken
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    res.header('auth-token', token).json({
        token: token
    })
}

exports.findOne = (req, res) => {
    const id = req.params._id

    User.findById(id)
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

    User.findByIdAndUpdate(id, req.body)
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

    User.findByIdAndRemove(id)
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