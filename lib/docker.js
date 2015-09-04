var Docker = require("dockerode");
var _ = require("lodash");
var async = require("async");

var docker = function(input,callback){
    var host = new Docker(input);
    host.listContainers(function(err,res){
        if(err){
            callback(err);
        } else {
            var list = _.map(res,'Id');
            for (var i = 0; i < list.length; i++) {
                list[i] = {
                    id:list[i],
                    host: input.host,
                    port: input.port
                }
            }
            async.map(list,getInfo,function(err,res){
                if(err){
                    callback(err);
                } else {
                    var output = _.filter(res,function(n){
                        return n.app;
                    })
                    callback(null,output);
                }
            })
        }
    })
}

var getInfo = function(input,callback){
    var host = new Docker({
        host:input.host,
        port:input.port
    });
    host.getContainer(input.id).inspect(function(err,res){
        if(err){
            callback(err);
        } else {
            var app = _.filter(res.Config.Env,function(n){
                return n.indexOf('MESOS_TASK') > -1 ;
            })
            if(app[0]){
                var data = {
                    ip: res.NetworkSettings.IPAddress,
                    image:res.Config.Image,
                    network:res.HostConfig.NetworkMode,
                    app: app[0].split('=')[1].split('.')[0]
                }
            } else {
                var data = {
                    ip: res.NetworkSettings.IPAddress,
                    image:res.Config.Image,
                    network:res.HostConfig.NetworkMode,
                    app: null
                }
            }
            callback(null,data);
        }
    })
}


module.exports = docker;