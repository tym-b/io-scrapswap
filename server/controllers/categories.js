var mongoose = require('mongoose');
var tools = require('lodash');
var Category = mongoose.model('Category');

/**
 * @api {get} api/category Get all categories
 * @apiName GetCategories
 * @apiGroup Categories
 * @apiSuccess {Object[]} . Array of categories.
 * @apiError Error404 Categories were not found.
 */
exports.all = function(req, res) {
    console.log("------------------- USER ------------------");
    console.log(req.user);
    Category.find({}).lean().exec(function(err, categories) {
        if (!err) {
            res.json(categories);
        } else {
            console.log("--- Error in Category.all ---");
            console.log(err);
            res.status(404).send(err);
        }
    });
};

/**
 * @api {get} api/category/:id Get category
 * @apiName GetCategory
 * @apiGroup Categories
 * @apiParam {Number} id Categories unique ID.
 *
 * @apiSuccess {String} _id ID of the Category.
 * @apiSuccess {String} name  Name of the Category.
 *
 * @apiError Error404 Category was not found.
 */
exports.one = function(req, res) {
    var query = {
        _id: req.params.id
    };
    Category.findOne(query).lean().exec(function(err, category) {
        if (!err) {
            res.json(category);
        } else {
            console.log("--- Error in Category.one ---");
            console.log(err);
            res.status(404).send(err);
        }
    });
};

/**
 * @api {post} api/category Add new category
 * @apiName AddCategory
 * @apiGroup Categories
 * @apiSuccess {Code} . 200
 * @apiError Error400 Error occured.
 */
exports.add = function(req, res) {
    Category.create(req.body, function(err, newCategory) {
        if (!err) {
            res.json(newCategory);
        } else {
            console.log("--- Error in Advert.add ---");
            console.log(err);
            res.status(400).send(err);
        }
    });
};

/**
 * @api {put} api/category/:id Update category
 * @apiName UpdateCategory
 * @apiGroup Categories
 * @apiParam {Number} id Categories unique ID.
 * @apiSuccess {Code} . 200.
 * @apiSuccess {String} . Message: "Updated successfully".
 * @apiError Error400 Error occured.
 */
exports.update = function(req, res) {
    var query = {
        _id: req.params.id
    };
    var data = tools.omit(req.body, ['_id', '_v']);
    Category.findOneAndUpdate(query, data, {
        runValidators: true
    }, function(err) {
        if (!err) {
            res.status(200).send("Updated successfully");
        } else {
            console.log("--- Error in Advert.update ---");
            console.log(err);
            res.status(400).send(err);
        }
    });
};

/**
 * @api {delete} api/category/:id Delete category
 * @apiName DeleteCategory
 * @apiGroup Categories
 * @apiParam {Number} id Categories unique ID.
 * @apiSuccess {Code} . 200.
 * @apiSuccess {String} . Message: "Removed successfully".
 * @apiError Error400 Error occured.
 */
exports.remove = function(req, res) {
    var query = {
        _id: req.params.id
    };
    Category.findOneAndRemove(query, function(err, data) {
        if (!err) {
            res.status(200).send('Removed successfully');
        } else {
            console.log("--- Error in Advert.delete ---");
            console.log(err);
            res.status(400).send(err);
        }
    });
};
