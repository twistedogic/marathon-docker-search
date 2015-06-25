var docker = require('../lib/docker.js');
var _ = require('lodash');
describe("Get docker container list",function(){
    it("list is good",function(done){
        docker({
            host:'10.0.0.129',
            dockeport:4243, 
            term:"twistedogic/ambari-serf:latest"
        },function(err,res){
            if(_.isObject(res)){
                done();
            }
        })
    })
})