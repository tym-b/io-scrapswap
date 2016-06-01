var mongoose = require('mongoose');
var tools = require('lodash');
var Advert = mongoose.model('Advert');
var checkPermission = require('../tools/checkPermission.js');
var errorExist = require('../tools/errorExist.js');
var sendModel = require('../tools/sendModel.js');

/**
 * @api {get} api/advert Get all adverts
 * @apiName GetAdverts
 * @apiGroup Adverts
 * @apiSuccess {Object[]} . Array of adverts.
 * @apiError Error404 Adverts were not found.
 */
exports.all = function(req, res) {
    Advert.find({}).lean().sort('-date').populate('user').populate('category').exec(function(err, adverts) {
        if (!errorExist(err, res)) {
            sendModel(res, adverts);
        }
    });
};

/**
 * @api {get} api/advert/:id Get advert
 * @apiName GetAdvert
 * @apiGroup Adverts
 * @apiParam {Number} id Adverts unique ID.
 *
 * @apiSuccess {String} _id ID of the Advert.
 * @apiSuccess {String} title  Title of the Advert.
 * @apiSuccess {String} user  Author of the Advert.
 * @apiSuccess {String} body  Description by the author.
 * @apiSuccess {String} location  Location of scrap.
 * @apiSuccess {String} category  Category of the Advert.
 * @apiSuccess {String} mainImage  URL of main image.
 * @apiSuccess {Object[]} images  Array of image URLs.
 * @apiSuccess {String} date  Date of creation.
 *
 * @apiError Error404 Advert was not found.
 */
exports.one = function(req, res) {
    Advert.findById(req.params.id).lean().populate('user').populate('category').exec(function(err, advert) {
        if (!errorExist(err, res)) {
            sendModel(res, advert);
        }
    });
};

/**
 * @api {post} api/advert Add new advert
 * @apiName AddAdverts
 * @apiGroup Adverts
 * @apiSuccess {Code} . 200
 * @apiError Error400 Error occured.
 */
exports.add = function(req, res) {
    if (checkPermission(req, res, "No permission to add")) {
        req.body.user = req.user._id;

        Advert.create(req.body, function(err, newAdvert) {
            if (!errorExist(err, res)) {
                Advert.findById(newAdvert._id).lean().populate('user').populate('category').exec(function(err, advert) {
                    if (!errorExist(err, res)) {
                        sendModel(res, advert);
                    }
                });
            }
        });
    }
};

/**
 * @api {put} api/advert/:id Update advert
 * @apiName UpdateAdverts
 * @apiGroup Adverts
 * @apiParam {Number} id Adverts unique ID.
 * @apiSuccess {Code} . 200.
 * @apiSuccess {String} . Message: "Updated successfully".
 * @apiError Error400 Error occured.
 */
exports.update = function(req, res) {
    if (checkPermission(req, res, "No permission to update")) {
        var query = {
            _id: req.params.id,
            user: req.user._id
        };

        var data = tools.omit(req.body, ['_id', '_v', 'date', 'user']);

        var options = {
            runValidators: true,
            new: true
        };

        Advert.findOneAndUpdate(query, data, options)
            .lean()
            .sort('-date')
            .populate('user')
            .populate('category')
            .exec(function(err, adverts) {
                if (!errorExist(err, res)) {
                    sendModel(res, adverts);
                }
            });
    };
};

/**
 * @api {delete} api/advert/:id Delete advert
 * @apiName DeleteAdverts
 * @apiGroup Adverts
 * @apiParam {Number} id Adverts unique ID.
 * @apiSuccess {Code} . 200.
 * @apiSuccess {String} . Message: "Removed successfully".
 * @apiError Error400 Error occured.
 */
exports.remove = function(req, res) {
    if (checkPermission(req, res, "No permission to delete")) {
        var query = {
            _id: req.params.id,
            user: req.user._id
        };

        Advert.findOne(query, function(err, advert) {
            if (!errorExist(err, res)) {
                if (advert) {
                    advert.remove(function(err) {
                        if (!errorExist(err, res))
                            res.send("Removed successfully");
                    });
                } else {
                    res.status(404).send("Can not find advert to delete!!!");
                }
            }
        });
    };
};
