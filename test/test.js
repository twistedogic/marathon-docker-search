var marathon = require('../lib/marathon.js');
var docker = require('../lib/docker.js');
var _ = require('lodash');
describe("Marathon",function(){
    it("Get task list",function(done){
        marathon({
            host:'10.0.0.129',
            port:8081 
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    })
})
describe("Docker",function(){
    it("Get hostname, image, ip",function(done){
        docker({
            host:'10.0.0.127',
            port:4243
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    })
})