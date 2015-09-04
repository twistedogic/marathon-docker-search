var mesos = require("mesos");
var _ = require("lodash");
var marathon = function(input ,callback){
    mesos.Marathon(input).tasks(function (err,res) {
        if(err){
            callback(err);
        } else {
            callback(null,_.uniq(_.map(res,'host')));
        }
    })
}
module.exports = marathon;