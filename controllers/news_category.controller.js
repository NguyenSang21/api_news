const mongoose = require('mongoose');
const NewsCategory = require('../models/news_category.model.js');
// Create and Save a new Note
exports.createNewsCategory = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Tiêu đề không được trống !"
        });
    }

    const newsCategory = new NewsCategory({
        title: req.body.title,
        items: req.body.items
    });
    // Save Note in the database
    newsCategory.save()
    .then(data => {
        console.log(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Lỗi không thể tạo !",
        });
    });
    res.status(500).send({
        message: "Tạo thành công bản loại bản tin",
    });

};

// Retrieve and return all notes from the database.
exports.findAllNewsCategory = (req, res) => {
    NewsCategory.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Find a single note with a noteId
exports.findOneNewsCategory = (req, res) => {
    NewsCategory.findById(req.params.news_categoryId)
    .then(newsCategory => {
        if(!newsCategory) {
            console.log("Không tìm thấy note với id "+ req.params.news_categoryId);       
        }else{
            res.status(200).json(newsCategory);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

// Update a note identified by the noteId in the request
exports.updateNewsCategory = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Tiêu đề không được rỗng!"
        });
    }

    // Tìm 1 loại báo
    NewsCategory.findByIdAndUpdate(req.params.news_categoryId, {
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        items:[]
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Không thể tìm thấy note với id" + req.params.news_categoryId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: err.message
            });
        }
        return res.status(500).send({
            message: "Lỗi update " + req.params.news_categoryId
        });
    });
};


// Xóa 1 loại báo
exports.deleteNewsCategory = (req, res) => {
    NewsCategory.findByIdAndRemove(req.params.news_categoryId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Không tìm thấy note với id " + req.params.news_categoryId
            });
        }
        res.send({message: "Xóa thành công !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: err.message
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.news_categoryId
        });
    });
};

// Thêm một loại trong thể loại báo
exports.addChildCategory = (req, res) => {
    NewsCategory.findByIdAndUpdate(req.params.news_categoryId,{$push: {items:{
        key: req.body.key,
        title: req.body.title
    }}}, {new: true})
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "Không tìm thấy note với id " + req.params.news_categoryId
            });
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: err.message
            });
        }
        return res.status(500).send({
            message: "Error"
        });
    });
}

//Xóa 1 loại trong thể loại báo
exports.removeChildCategory = (req, res) => {
    NewsCategory.update({_id: req.params.news_categoryId},{$pull: {items:{
        key: req.body.key
    }}}, {new: true})
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "Không tìm thấy note với id " + req.params.news_categoryId
            });
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: err.message
            });                
        }
        return res.status(500).send({
            message: "Error"
        });
    });
}