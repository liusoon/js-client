var base64 = require('base64-js');

var ENDPOINT = 'https://www.bitballoon.com';

var Client = require("client").Client;

exports.createClient = function(options) {
  return new Client(options.access_token);
};

exports.tokenFromCrendentials = function(options, cb) {
  var xhr = new (options.xhr || Client.XMLHttpRequest);
  xhr.open("post", ENDPOINT + "/oauth/token", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", "Basic " + base64.fromByteArray(
    stringToByteArray(options.client_id + ":" + options.client_secret)
  ));
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        cb(null, data.access_token);      
      } else {
        cb(xhr.responseText, null);
      }
    }
  }
  xhr.send("grant_type=client_credentials");    
};

if (typeof(window) !== 'undefined') {
  window.bitballoon = exports;
}