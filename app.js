var marathon = require('./lib/marathon.js');
var docker = require('./lib/docker.js');
var _ = require('lodash');
var async = require('async');
var tablify = require('tablify');
var argv = require('minimist')(process.argv.slice(2));
function showHelp(){
    console.log(
        "<marathon app id> search term\n" +
        "-h, --help show help\n" + 
        "-m marathon IP\n" +
        "-p marathon Port (default:8080)\n" +
        "-d docker remote API port (default:4243)"
    );
}
if (argv.h || argv.help){
    showHelp();
    process.exit(0);
}
if(Object.keys(argv).length < 2){
    showHelp();
    process.exit(0);
}
var input = {
    host:argv.m || 'localhost',
    port:argv.p || 8080,
    dockerport: argv.d || 4243,
    term: argv._[0] || null
};
console.log(input);
marathon({
    host: input.host,
    port: input.port
},function(err,res){
    var dockerHost = [];
    _.each(res,function(n){
        dockerHost.push({
            host:n,
            port:input.dockerport
        })
    });
    async.map(dockerHost,docker,function(err,res){
        if(err){
            console.log(err);
        } else {
            var output = _.flatten(res);
            console.log(tablify(output));
        }
    })
})