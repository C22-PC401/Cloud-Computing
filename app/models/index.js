require("dotenv").config();
const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

const db = {};
const { PROD_URI } = process.env;
db.mongoose = mongoose;
db.url = process.env.PROD_URI;
db.report = require("./report.model.js")(mongoose)
db.information = require("./information.model.js")(mongoose)
db.community = require("./community.model.js")(mongoose)
db.user = require("./user.model.js")(mongoose)

module.exports = db;