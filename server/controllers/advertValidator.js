var categoryEnum = require("../models/category.js");

var advertValidator = function(){
  var service = {
    checkTitle: checkTitle,
    checkBody: checkBody,
    checkCategory: checkCategory
  };

  return service;

  function checkTitle(title) {
    return !isEmpty(title) && isString(title);;
  }

  function checkBody(body) {
    return !isEmpty(body) && isString(body);;
  }

  function checkCategory(category) {
    return !isEmpty(category) && isString(category) && isInArray(category, categoryEnum);
  }



  function isEmpty(value){
    return !value;
  }

  function isString(value){
    return (typeof value === 'string' || value instanceof String);
  }

  function isInArray(value, array) {
    return array.indexOf(value) !== (-1);
  }
}

module.exports = advertValidator();
