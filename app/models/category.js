var mongoose = require('mongoose')
var CategorySchema = require('../schemas/category')
var Category = mongoose.model('categorys', CategorySchema)

module.exports = Category