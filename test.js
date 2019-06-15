var assert = require('assert');
var clients = require('restify-clients');

var client = clients.createJsonClient({
    url: 'http://localhost:8077',
    version: '~1.0'
});

client.get('/echo/mark', function (err, req, res, obj) {
    assert.ifError(err);
    // console.log('Server returned: %j', obj);
});

client.post('/sql', {
    sql:`select threadName from Logs where level='ERROR'`,
//    uri:"mongodb://192.168.0.30:27017/tapdata"
    uri:"mongodb://admin:QHTFmmbYWKEeEVhv@localhost:27017/tapdata?authSource=admin"
}, function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Server returned: %j', obj);
});
