const mongoose = require('mongoose');
const News = require('../models/news.model.js');
const NewsCategory = require('../models/news_category.model.js');

// Tạo một bài báo
exports.createNews = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Tiêu đề không được trống !!!"
        });
    }

    //Thêm vào một bài báo 
    NewsCategory.findById(req.body.categoryId) // tìm xem loại báo đã có hay chưa
    .then(data => {
        if(data){                              // nếu có rồi tạo bài báo
            const news = new News({
                title: req.body.title,
                keyCategory: req.body.keyCategory,
                metaKey: req.body.metaKey,
                description: req.body.description,
                detail: req.body.detail,
                date: req.body.date,
                comment: req.body.comment,
                images: {image:req.body.images.image, imageAlt:req.body.images.imageAlt},
                videos: {urlVideo:req.body.videos.urlVideo, altVideo:req.body.videos.altVideo, imgVideo:req.body.videos.imgVideo}
            });
        
            // Save Note in the database
            news.save()
            .then(data => {
                res.status(500).send({
                    count: data.lenght,
                    message: "Tạo thành công bản tin mới",
                    createNews: news
                });
            
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Lỗi tạo mới.",
                });
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    });
    
};

// Lấy tất cả
exports.findAllNews = (req, res) => {
    News.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Tìm 1 bài báo với id
exports.findOneNews = (req, res) => {
    News.findById(req.params.newsId)
    .then(news => {
        if(!news) {
            console.log("Not found with id"+ req.params.newsId);       
        }else{
            res.status(200).json(news);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

// Tìm 1 bài báo với id
exports.findKeyCategoryNews = (req, res) => {
    News.find({keyCategory:req.params.keyCategory})
    .then(news => {
        if(!news) {
            console.log("Not found with id"+ req.params.keyCategory);       
        }else{
            res.status(200).json(news);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

// Tìm 1 bài báo với metaKey
exports.findOneKeyNews = (req, res) => {
    News.find({metaKey:req.params.metaKey})
    .then(news => {
        if(!news) {
            console.log("Not found with id" + req.params.metaKey);       
        }else{
            res.status(200).json(news);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

// Lấy số lượng bài báo theo loại báo và được giới hạn số lượng 
exports.findLimitNumberNews = (req, res) => {
    News.find({keyCategory: req.params.keyCategory}).limit(Number(req.params.limitNumber))
    .then(news => {
        if(!news) {
            console.log("Not found with id" + req.params.keyCategory);
        }else{
            res.status(200).json(news);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

// update bài báo
exports.updateNews = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    News.findByIdAndUpdate(req.params.newsId, {
        title: req.body.title,
        keyCategory: req.body.keyCategory,
        metaKey: req.body.metaKey,
        description: req.body.description,
        detail: req.body.detail,
        date: req.body.date,
        comment: req.body.comment,
        images: {image:req.body.images.image, imageAlt:req.body.images.imageAlt},
        videos: {urlVideo:req.body.videos.urlVideo, altVideo:req.body.videos.altVideo, imgVideo:req.body.videos.imgVideo}
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.newsId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.newsId
        });
    });
};


// Xóa 1 bài báo
exports.deleteNews = (req, res) => {
    News.findByIdAndRemove(req.params.newsId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.newsId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.newsId
        });
    });
};

exports.addImageNews = (req, res) => {
    News.findByIdAndUpdate(req.params.newsId,{$push: {images:{image:req.body.image, imageAlt:req.body.imageAlt}}}, {new: true})
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