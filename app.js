let restify = require('restify');
let sql2mongo = require('qh-sql2mongoscript');
// const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { exec } = require('child_process');
// const cgcmd = "mongo";



const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});

server.post('/sql', function (req, res, next) {
    // console.log(req.body);
    let sql = req.body.sql;
    let mql = sql2mongo.default(sql);
    req.mql = mql;
    res.send(mql);
    return next();
}, function (req, res, next) {
    // Connection URL
    const url = req.body.uri;

    const cmd = exec(`mongo --eval ${req.mql} ${url}`);
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);

    return next();
});


server.listen(8077, function () {
    console.log('%s listening at %s', server.name, server.url);
});