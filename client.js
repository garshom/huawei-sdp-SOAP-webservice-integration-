
var soap = require('soap');
var url = 'http://127.0.0.1:8001/SayHello?wsdl';

var args = {firstName: 'Charles Garshom'};

soap.createClient(url, function(err, client) {
    client.sayHello(args, function(err, result) {
        console.log(result.greeting);
    });
    

    console.log(client.describe());
});


/*
var request = require('request');
var assert = require('assert');
var url = 'http://127.0.0.1:8001' ;

var requestXML = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
  '<Body>' +
  '<sayHello xmlns="http://www.examples.com/wsdl/HelloService.wsdl">' +
  '<firstName>Garshom</firstName>' +
  '</sayHello>' +
  '</Body>' +
  '</Envelope>';
var responseXML = '<?xml version="1.0" encoding="utf-8"?>' +
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:tns="http://www.examples.com/wsdl/HelloService.wsdl">' +
  '<soap:Body>' +
  '<tns:sayHelloResponse>' +
  '<tns:greeting>tarun</tns:greeting>' +
  '</tns:sayHelloResponse>' +
  '</soap:Body>' +
'</soap:Envelope>';

request({
    url: url + '/SayHello',
    method: 'POST',
    headers: {
      SOAPAction: "sayHello",
      "Content-Type": 'text/xml; charset="utf-8"'
    },
    body: requestXML
  }, function (err, response, body) {
      if (err) {
          console.log("Service Connection error!");
          return
        }
    console.log(body);


    

});

*/