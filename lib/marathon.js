var mesos = require("mesos");
var _ = require("lodash");
marathon = function(input,callback){
    mesos.Marathon({host: input}).tasks(function (err,res) {
        if(err){
            callback(err);
        } else {
            var hosts = _.uniq(_.map(res, _.property('host')));
            callback(null,hosts);
        }
    })
}
module.exports = marathon;