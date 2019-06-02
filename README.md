# T-Shaped Surfer: A Landing Page template
A generic Landing page template to describe Product ideas and prompting viewers to subscribe for Early Access.

Features
------------
* **Landing Page for your Ideas** — Using Nodejs and Express, this project can be used as a template to start building your landing page 
* **Integrated with Analytics Tracking** — The project already includes snippets for analytical web tracking using Google Analytics and FB Pixel. So you can quickly integrate it with ad-campaign on Google Adword and FB Ads.
* **Designed for hosting in AWS Lambda** — To make things easy, this template is built to be hosted on AWS Lambda. So, it can reduce your cost to almost ZERO. AWS Lambda Free tier is up to 1-million requests per month
* **Data Stored in AWS DynamoDB** — Also to reduce your cost, this template uses AWS DynamoDB to store user subscription data. 25 Gigs of Free-tier storage.
* **Google Cloud Email Service with your Account** — You can optionally send email to your users, free using Google Cloud Email Service, sent from your account
* **Everything is Configurable** — Change the configuration to your needs


## Installing Project
* Start by installing dependencies to start this project.
```
npm install
```

* After finished with installation, run locally
```
node app.local.js
```

* To upload to AWS Lambda:
```
# Put your AWS credential on `~/.aws/credentials`
> more ~/.aws/credentials
[default]
aws_access_key_id = xxxxxxxxxxxx
aws_secret_access_key = yyyyyyyyyyyy

# Then, run below commands sequentially:
npm start
> generate_lambda

npm start
> deploy
```

## Authors

* [Anton Rifco](https://github.com/antonrifco)

## License

MIT -- see [LICENSE](LICENSE)

## Thanks To
Creator of New Age Template: https://startbootstrap.com/themes/new-age/
