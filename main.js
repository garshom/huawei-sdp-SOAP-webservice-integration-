'use strict';
const request=require("request");
const assert=require("assert")
const express=require("express");
const bodyParser=require("body-parser");
const soap=require("soap");

var wsdl = '<definitions name="HelloService" targetNamespace="http://www.examples.com/wsdl/HelloService.wsdl" xmlns="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://www.examples.com/wsdl/HelloService.wsdl" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><message name="SayHelloRequest"><part name="firstName" type="xsd:string"/></message><message name="SayHelloResponse"><part name="greeting" type="xsd:string"/></message><portType name="Hello_PortType"><operation name="sayHello"><input message="tns:SayHelloRequest"/><output message="tns:SayHelloResponse"/></operation></portType><binding name="Hello_Binding" type="tns:Hello_PortType"><soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/><operation name="sayHello"><soap:operation soapAction="sayHello"/><input><soap:body encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" namespace="urn:examples:helloservice" use="encoded"/></input><output><soap:body encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" namespace="urn:examples:helloservice" use="encoded"/></output></operation></binding><service name="Hello_Service"><documentation>WSDL File for HelloService</documentation><port binding="tns:Hello_Binding" name="Hello_Port"><soap:address location="http://127.0.0.1:8001/SayHello/" /></port></service></definitions>';


var service = {
    Hello_Service: {
      Hello_Port: {
        sayHello: function (args) {
          return {
            greeting: args.firstName
          };
        }
      }
    }
};

  
   //express server example
   var app = express();
   //body parser middleware are supported (optional)
   app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
   app.listen(8001,'127.0.0.1', function(){
       //Note: /wsdl route will be handled by soap module
      //and all other routes & middleware will continue to work
      soap.listen(app, '/SayHello', service, wsdl,function(){
          console.log("soap server initialised");
      });
      
  });