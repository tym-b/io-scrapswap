var mongoose = require('mongoose');
var tools = require('lodash');
var Advert = mongoose.model('Advert');

exports.all = function(req, res) {
  Advert.find({}).populate('user').exec(function(err, adverts) {
    if(!err) {
      res.json(adverts);
    }else {
      console.log(err);
    }
  });
};

exports.one = function(req, res) {
  var query = { _id: req.params.id };
  Advert.findOne(query).populate('user').exec(function(err, advert) {
    if(!err) {
      res.json(advert);
    }else {
      console.log(err);
    }
  });
};

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
