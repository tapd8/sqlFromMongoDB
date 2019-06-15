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
    sql:"select * from Logs",
    uri:"mongodb://192.168.0.30:27017/tapdata"
}, function (err, req, res, obj) {
    assert.ifError(err);
    console.log('Server returned: %j', obj);
});