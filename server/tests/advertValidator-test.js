var expect = require("expect");
var validator = require('../controllers/advertValidator.js');
var category = require("../models/category.js");

describe('AdvertValidator', function() {
  describe('Title', function() {
    it('should be ok because is non empty string', function (done) {
        expect(validator.checkTitle("Sprzedam deski")).toBe(true);
        done();
    });

    it('should be false because is not string', function (done) {
        expect(validator.checkTitle(5)).toBe(false);
        done();
    });

    it('should be false because is empty', function (done) {
        expect(validator.checkTitle()).toBe(false);
        done();
    });
  });

  describe('Body', function() {
    it('should be ok because is non empty string', function (done) {
        expect(validator.checkBody("Stare deski. W dobrym stanie. Sprzedam od zaraz")).toBe(true);
        done();
    });

    it('should be false because is not string', function (done) {
        expect(validator.checkTitle(123)).toBe(false);
        done();
    });

    it('should be false because is empty', function (done) {
        expect(validator.checkTitle()).toBe(false);
        done();
    });
  });

  describe('Category', function() {
    it('should be ok because is correct category', function (done) {
        expect(validator.checkCategory(category[0])).toBe(true);
        done();
    });

    it('should be false because is not category', function (done) {
        expect(validator.checkCategory("1a2s3d")).toBe(false);
        done();
    });

    it('should be false because is empty', function (done) {
        expect(validator.checkCategory()).toBe(false);
        done();
    });
  });

  describe('Advert', function() {

    var mockAdvert = {
      title: "Stare deski",
      user: "570d0bcde617b41c20c37f4d",
      body: "Deski sa w dobrym stanie",
      location: "Poznan, ul. Malysza 13",
      category: category[0],
      mainImage: "images/someMainImages.jpg",
      images: [
          { url: "images/img1.jpg" },
          { url: "images/img2.jpg" },
          { url: "images/img3.jpg" }
      ]
    };

    it('should be ok because advert is correct', function (done) {
        expect(validator.checkAdvert(mockAdvert)).toBe(true);
        done();
    });

    it('should be false because title is null', function (done) {
        mockAdvert.title = "";
        expect(validator.checkAdvert(mockAdvert)).toBe(false);
        done();
    });

    it('should be false because category is not correct', function (done) {
        mockAdvert.category = "1a2s3d4f";
        expect(validator.checkAdvert(mockAdvert)).toBe(false);
        done();
    });
  });
});
