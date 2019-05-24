'use strict';
var request=require("request");
var assert=require("assert")
var express=require("express");
var bodyParser=require("body-parser");
var soap=require("soap");

var app=express();

var server=app.listen(8082,function(){
    var host=server.address().address
    var port=server.address().port

    console.log("SOAP Server is running and listening at http://%s:%s",host,port)
})