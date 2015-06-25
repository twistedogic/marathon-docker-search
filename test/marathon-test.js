var marathon = require('../lib/marathon.js');
describe("Get marathon task list",function(){
    it("list is good",function(done){
        marathon({host:'10.0.0.129', dockeport:4243},function(err,res){
            if (res.length == 3){
                if(res[0].ip){
                    done();
                }
            }
        })
    })
})