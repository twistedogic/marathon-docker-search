var docker = require('../lib/docker.js');
describe("Get docker container list",function(){
    it("list is good",function(done){
        docker("twistedogic/ambari-serf",function(err,res){
            if(res.result.length == 3){
                done();
            }
        })
    })
})