const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use('/res', express.static('res'));
app.all(/.*/, function(req, res, next) {
    var host = req.header("host");
    if (host.match(/^www\..*/i) || host.match(/^localhost.*/i)) {
        next();
    } else {
        res.redirect(301, "https://www." + host + req.url);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/res/index.html');
})

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/submit', function(req, res){
    let params = req.body;
    
    let output = '<html><head><meta http-equiv="refresh" content="3;url=/#features" /></head>';
    output += '<br/><br/><center>Thanks for subscribing. <br/><br/>';
    output += '<a href="/#features" target="_self" >Get back to homepage</a></center>';
    res.setHeader('Content-Type', 'text/html');
    res.send(output);
});

module.exports = app;