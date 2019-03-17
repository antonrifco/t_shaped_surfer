const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
    
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
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'anton.rifco@gmail.com',
            clientId: '1091658026354-gsnutk043c3of5110nf2k08sfbadm3dh.apps.googleusercontent.com',
            clientSecret: '1olCMNjTB9Ib_ng-cJn25pxb',
            refreshToken: '1/z99W_1yW535ryCk6ZF0SvR0RNz4sA8LST7RVQ4ZKcf4'
        }
    })
    
    var mailOptions = {
        from: 'Startup Name <no-reply@startup.com>',
        to: req.body.inputEmail.trim(),
        subject: '[Startup] Confirmation of subscription',
        text: 'Thanks for subscribing',
        html: '<p>Hi ' + req.body.inputName.trim() + '</p><p>Thanks for subscribing</p>'
    }
    transporter.sendMail(mailOptions, (err, result)=>{
        if(err){
            console.log('Error gan!');
        } else{
            
        }
        let output = '<html><head><meta http-equiv="refresh" content="2;url=/#features" /></head>';
        output += '<br/><br/><center>Thanks for subscribing. <br/><br/>';
        output += '<a href="/#features" target="_self" >Get back to homepage</a></center>';
        res.setHeader('Content-Type', 'text/html');
        res.send(output);
    });
});

module.exports = app;