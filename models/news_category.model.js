const mongoose = require('mongoose');

const News_categorySchema = mongoose.Schema({
    title: String,
    items: []
}, {
    timestamps: true
});

module.exports = mongoose.model('NewsCategory', News_categorySchema);