var Docker = require("dockerode");
var _ = require("lodash");
var async = require("async");
var test = [{ 
    ip: '10.0.0.127',
    port:4243
},{ 
    ip: '10.0.0.130',
    port:4243
},{ 
    ip: '10.0.0.131',
    port:4243
}];
function connectDocker(input,callback){
    var ip = input.ip;
    var port = input.port;
    var host = new Docker({host: 'http://' + ip, port: port});
    host.listContainers(function (err, containers) {
        if(err){
            callback(err);
        } else {
            var list = _.uniq(_.map(containers,'Id'));
            for (var i = 0; i < list.length; i++) {
                list[i] = {
                    ip:ip,
                    port:port,
                    id: list[i]
                }
            }
            callback(null,list);
        }
    })
}

function getAllId(input,callback){
    async.map(input,connectDocker,function(err,res){
        if(err){
            callback(err)
        } else {
            callback(null,res)
        }
    })
}
async.map(test,connectDocker,function(err,res){
    if(err){
        console.log(err)
    } else {
        var output = res.join(',');
        console.log(output);
    }
})