var mesos = require("mesos");
var _ = require("lodash");
dockerHost = function(input ,callback){
    var ip = input.host || 'localhost';
    var port = input.dockerport || 4243;
    mesos.Marathon({host: ip}).tasks(function (err,res) {
        if(err){
            callback(err);
        } else {
            var hosts = _.uniq(_.map(res,'host'));
            for (var i = 0; i < hosts.length; i++) {
                hosts[i] = {
                    ip:hosts[i],
                    port:port
                }
            }
            callback(null,hosts);
        }
    })
}
module.exports = dockerHost;