var webdriverio = require('webdriverio');
var assert = require('assert');

describe('selenium tests', function(){

    this.timeout(99999999);

    it('shows error when unknown user tries to sign in', function() {
      browser
        .url('https://io-scrapswap.herokuapp.com/')
        .click('//*[@id="app"]/div/div[1]/div[2]/button')
        .pause(500);

      browser
        .setValue('input[name=email]', 'nie@istnieje.pl')
        .setValue('input[name=password]', 'nie-istnieje');

      browser
        .click('/html/body/div[2]/div/div[1]/div/div/div[2]/button[2]');

      browser
        .waitForExist('//body/div[2]/div/div[1]/div/div/div[1]/form/div[1]/div[3]', 1000)

      browser
        .getValue('//body/div[2]/div/div[1]/div/div/div[1]/form/div[1]/div[3]', function(value) {
          assert(value === 'Taki adres nie istnieje w bazie');
        });
    });

});