const dbConfig = require("../../config/db.config.js")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.report = require("./report.model.js")(mongoose)
db.information = require("./information.model.js")(mongoose)
db.community = require("./community.model.js")(mongoose)
db.user = require("./user.model.js")(mongoose)

module.exports = db;