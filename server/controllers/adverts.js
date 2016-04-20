var mongoose = require('mongoose');
var tools = require('lodash');
var Advert = mongoose.model('Advert');

/**
  * @api {get} api/advert Get all adverts
  * @apiName GetAdverts
  * @apiGroup Adverts
  * @apiSuccess {Object[]} . Array of adverts.
  * @apiError Error404 Adverts were not found.
*/
exports.all = function(req, res) {
  Advert.find({}).populate('user').exec(function(err, adverts) {
    if(!err) {
      res.json(adverts);
    }else {
      console.log(err);
      res.status(404).send(err);
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
  var query = { _id: req.params.id };
  Advert.findOne(query).populate('user').exec(function(err, advert) {
    if(!err) {
      res.json(advert);
    }else {
      console.log(err);
      res.status(404).send(err);
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
  Advert.create(req.body, function (err, newAdvert) {
    if (!err) {
      res.status(200).send(newAdvert);
    }else {
      console.log(err);
      res.status(400).send(err);
    }
  });
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
  var query = { _id: req.params.id };
  var data = tools.omit(req.body, ['_id', '_v', 'date', 'user']);
  Advert.findOneAndUpdate(query, data, { runValidators: true }, function(err) {
    if(!err) {
      res.status(200).send("Updated successfully");
    } else {
      console.log(err);
      res.status(400).send(err);
    }
  });
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
  var query = { _id: req.params.id };
  Advert.findOneAndRemove(query, function(err, data) {
    if (!err) {
      res.status(200).send('Removed successfully');
    } else {
      console.log(err);
      res.status(400).send(err);
    }
  });
};
