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


});
