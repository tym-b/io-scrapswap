var categoryEnum = ["Wood", "Plastic", "Metal", "Other"];

var advertValidator = function(){
  var service = {
    checkTitle: checkTitle,
    checkBody: checkBody,
    checkCategory: checkCategory,
    checkAdvert: checkAdvert
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

  function checkAdvert(advert) {
    return checkTitle(advert.title) && checkBody(advert.body) && checkCategory(advert.category);
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
