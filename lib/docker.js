var Docker = require("dockerode");
var _ = require("lodash");
var async = require("async");
var marathon = require("./marathon.js");
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
            var output = res[0];
            for (var i = 1; i < res.length; i++) {
                output = output.concat(res[i])
            }
            callback(null,output);
        }
    })
}

function getContainerInfo(input,callback){
    var ip = input.ip;
    var port = input.port;
    var id = input.id;
    var host = new Docker({host: 'http://' + ip, port: port});
    host.getContainer(id).inspect(function(err,res){
        if(err){
            callback(err)
        } else {
            callback(null,res)
        }
    })
}

function getAllContainer(input,callback){
    getAllId(input,function(err,res){
        if(err){
            callback(err)
        } else {
            async.map(res,getContainerInfo,function(e,r){
                if(e){
                    callback(e)
                }
                var output = r;
                for (var i = 0; i < output.length; i++) {
                    output[i] = {
                        hostname : output[i].Config.Hostname,
                        image : output[i].Config.Image,
                        ip : output[i].NetworkSettings.IPAddress,
                        cpu: output[i].Config.CpuShares,
                        mem: output[i].Config.Memory
                    }
                }
                callback(null,output);
            })
        }
    })
}

module.exports = function(input,callback){
    var term = input.term;
    var filter = input.filter;
    marathon(input,function(err,res){
        if(err){
            callback(err)
        } else {
            getAllContainer(res,function(e,r){
                if(e){
                    callback(e)
                } else {
                    if(term){
                        var output = _.filter(r, _.matches({ image: term }));
                    } else {
                        var output = r;
                    }
                    if(filter){
                        var output = _.map(output,filter);
                    }
                    callback(null,output);
                }
            })
        }
    })
}


