'use strict';
const request=require("request");
const assert=require("assert")
const express=require("express");
const bodyParser=require("body-parser");
const soap=require("soap");

const fs=require("fs");

const wsdlfile=fs.readFileSync('./xmlfiles/myservice.wsdl','utf8');

var myservices={MyService: {
    MyPort: {
        MyFunction: function(args) {
            console.log(args.name);
            return {
                name: args.name
            };
        },

        // This is how to define an asynchronous function with a callback.
        MyAsyncFunction: function(args, callback) {
            // do some work
            callback({
                name: args.name
            });
        },

        // This is how to define an asynchronous function with a Promise.
        MyPromiseFunction: function(args) {
            return new Promise((resolve) => {
              // do some work
              resolve({
                name: args.name
              });
            });
        },

        // This is how to receive incoming headers
        HeadersAwareFunction: function(args, cb, headers) {
            return {
                name: headers.Token
            };
        },

        // You can also inspect the original `req`
        reallyDetailedFunction: function(args, cb, headers, req) {
            console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
            return {
                name: headers.Token
            };
        }
    }
}}
var app=express();
app.use(bodyParser.raw({type:function(){return true;},limit:'5mb'}))
var server=app.listen(8082,"127.0.0.1",function(){
    var host=server.address().address
    var port=server.address().port
    console.log("Express Server is running and listening at http://%s:%s",host,port)

    //Note WSDL route will be handled by the soap module and all other routes and middleware will continue to work 

    //Initiate SOAP Server within express server

    soap.listen(
        app,
        '/webservice/wsdl', // url path on which the soap server is listening to receive soap requuests
        myservices, // services that the soap webservice will provide
        wsdlfile, // wsdl file that defines the services of the webservice
        function(){ // callback funtion after the soap server has been initialised
            console.log("SOAP Server has been initialised ")
        })

})



