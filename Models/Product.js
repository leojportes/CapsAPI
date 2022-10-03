const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    urlImage: String,
    name: String,
    description: String,
    category: String,
    price: String,
    craftsman: String,
    wppNumber: String,
    email: String,
})

module.exports = Product