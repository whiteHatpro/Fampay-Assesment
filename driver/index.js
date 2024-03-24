const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.db.mongoDB.url); // connect to our database


module.exports = {
    mongoose
}
