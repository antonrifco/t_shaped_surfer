const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.js');

const nodemailer = require('nodemailer');

const app = express();

app.use('/res', express.static('res'));
app.all(/.*/, function(req, res, next) {
    var host = req.header("host");
    if (host.match(/^www\..*/i) || host.match(/^localhost.*/i) || host.match(/amazonaws\.com*/i)) {
        next();
    } else {
        res.redirect(301, "https://www." + host + req.url);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/res/index.html');
})
app.get('/submit', (req, res) => {
    res.redirect('/');
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.gcp_email,
        clientId: config.gcp_clientId,
        clientSecret: config.gcp_clientSecret,
        refreshToken: config.gcp_refreshToken
    }
});

const AWS = require("aws-sdk");
AWS.config.update({
    region: config.aws_region,
    accessKeyId: config.aws_accessKeyId,
    secretAccessKey: config.aws_secretAccessKey
});
const db_client = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/submit', async(req, res) => {
    let params = req.body;
    if(typeof params.inputEmail === 'undefined' || typeof params.inputEmail === 'undefined' )
        res.send('invalid params')
    else {
        let name = params.inputName.trim();
        let email = params.inputEmail.trim();
        let phone = params.inputPhone.trim();
        
        var data = {
            TableName: 'early-access',
            Item:{
                'email': email,
                'name': name,
                'phone': phone
            }
        };
        var util = require('util');

        await db_client.put(data).promise();
        
        var mailOptions = {
            from: config.email_from,
            to: email,
            subject: config.email_subject_confirmation,
            text: 'Thanks for subscribing',
            html: '<p>Hi ' + name + '</p><p>Thanks for subscribing</p>'
        }
        transporter.sendMail(mailOptions, (err, result)=>{
            if(err){
                console.log('Error gan!');
            } else{
                console.log('Successfully sending email');
            }
            let output = '<html><head><meta http-equiv="refresh" content="2;url=/#features" /></head>';
            output += '<br/><br/><center>Thanks for subscribing. <br/><br/>';
            output += '<a href="/#features" target="_self" >Get back to homepage</a></center>';
            res.setHeader('Content-Type', 'text/html');
            res.send(output);
        });
    }
});

module.exports = app;
