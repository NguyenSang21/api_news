const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: String,
    keyCategory: String,
    metaKey: String,
    description: String,
    detail: String,
    date: String,
    comment:String,
    images: [{image:String, imageAlt:String}],
    videos: [{urlVideo:String, altVideo:String}]
}, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);