var docker = require("./lib/docker.js");
var _ = require('lodash');
var argv = require('minimist')(process.argv.slice(2));
function showHelp(){
    console.log(
        "<image> search term\n" +
        "<ip|hostname|cpu|mem> search term\n" +
        "-h, --help show help\n" + 
        "-m marathron IP\n" +
        "-p docker remote API port (default:4243)"
    );
}
// if (argv.h || argv.help){
//     showHelp();
//     process.exit(0);
// }
// if(Object.keys(argv).length < 2){
//     showHelp();
//     process.exit(0);
// }
var input = {
    host:argv.m || '10.0.0.129',
    dockeport: argv.p || 4243,
    term: argv._[0] || null,
    filter: argv._[1] || null
};
docker(input,function(err,res){
    if(err){
        console.log(err)
    } else {
        if(res.length < 1){
            console.log("No match found. Maybe add the tagname.");
        } else {
            if(_.isObject(res[0])){
                console.log(res);
            } else {
                console.log(res.join("\n"));
            }
        }
    }
})