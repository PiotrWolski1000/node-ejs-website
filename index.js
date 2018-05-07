const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
const express = require('express')
const sgMail = require('@sendgrid/mail')

const app = express()
const port  = 5000

app.use(bodyParser.urlencoded({ extended: true }));
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//static files
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static("assets"))
app.use(express.static("js"))
app.use(express.static("styles"))

app.get( '/',  (req, res) => {
    res.render('app', {
        title: "Piotr Wolski"
    })
    
})


app.post('/', (req, res) => {
    const msg = {
        to: process.env.TO,
        from: process.env.FROM,
        subject: req.body.mail_subject,
        text: "Message from " + req.body.name + ": " + req.body.message + ", phone number: " + req.body.phone,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    
    sgMail.send(msg);

    res.render( 'app', { title: 'Piotr Wolski', message : "Message will be delivered as soon as possible, thank you :)" } );
})



app.listen(process.env.PORT || port)