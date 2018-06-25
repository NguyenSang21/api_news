module.exports = (app) => {
    const news = require('../controllers/news.controller.js');

    const news_category = require('../controllers/news_category.controller.js');

//////////////////////////////// TẠO MỘT NEWS ////////////////////////////////////
    // Create a new Note
    app.post('/news', news.createNews);

    // Retrieve all Notesss
    app.get('/news', news.findAllNews);

    // Retrieve a single Note with noteId
    app.get('/news/:newsId', news.findOneNews);

    // Update a Note with noteId
    app.put('/news/:newsId', news.updateNews);

    // Delete a Note with noteId
    app.delete('/news/:newsId', news.deleteNews);

    // thêm ảnh vào trong loại
    app.put('/addImageNews/:newsId', news.addImageNews);

    // Tìm một báo theo metakey
    app.get('/news/key/:metaKey',news.findOneKeyNews);

    // Tìm tất cả bài báo thuộc 1 thể loại báo
    app.get('/news/category/key/:keyCategory', news.findKeyCategoryNews);

    // Lấy số lượng phần tử giới hạn đầu vào theo thể loại báo 
    app.get('/news/:keyCategory/:limitNumber', news.findLimitNumberNews);

//////////////////////////////// TẠO MỘT CATEGOTE /////////////////////////////////
    // Thêm mới 1 loại báo trong mục báo 
    app.post('/news_category', news_category.createNewsCategory);

    // Xem tất cả loại báo
    app.get('/news_category/', news_category.findAllNewsCategory);

    // Tìm 1 loại báo
    app.get('/news_category/:news_categoryId', news_category.findOneNewsCategory);

    // Update loại báo
    app.put('/news_category/:news_categoryId', news_category.updateNewsCategory);

    // Delete loại báo
    app.delete('/news_category/:news_categoryId', news_category.deleteNewsCategory);

    // Thêm 1 loại trong loại báo
    app.put('/addChildCategory/:news_categoryId', news_category.addChildCategory);

    // Xóa 1 loại trong loại báo
    app.put('/removeChildCategory/:news_categoryId', news_category.removeChildCategory);
    
}