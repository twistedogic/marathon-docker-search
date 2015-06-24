var marathon = require('../lib/marathon.js');
describe("Get marathon task list",function(){
    it("list is good",function(done){
        marathon(function(err,res){
            if (res.host.length == 3){
                done();
            }
        })
    })
})