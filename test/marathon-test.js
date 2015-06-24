var marathon = require('../lib/marathon.js');
describe("Get marathon task list",function(){
    it("list is good",function(done){
        marathon('10.0.0.129',function(err,res){
            if (res.length == 3){
                done();
            }
        })
    })
})