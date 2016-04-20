/**
 * Routes for express app
 */
var topics = require('../controllers/topics');
var adverts = require('../controllers/adverts');
var express = require('express');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');
var path = require('path');
var compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
var App = require(compiled_app_module_path);

module.exports = function(app, passport) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.post('/logout', users.postLogout);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // topic routes
  app.get('/topic', topics.all);
  app.post('/topic/:id', topics.add);
  app.put('/topic/:id', topics.update);
  app.delete('/topic/:id', topics.remove);

  //advert routes
  app.get('/api/advert', adverts.all);
  app.get('/api/advert/:id', adverts.one);
  app.post('/api/advert', adverts.add);
  app.put('/api/advert/:id', adverts.update);
  app.delete('/api/advert/:id', adverts.remove);

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string
  app.get('*', function (req, res, next) {
    App.default(req, res);
  });

};
