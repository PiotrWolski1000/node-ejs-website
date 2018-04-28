const express = require('express');
const app = express();
// const Typed = require('typed.js');
const port  = 3000

app.set('view engine', 'ejs')
//static files
app.set('views', './views')

app.use(express.static("assets"))
app.use(express.static("js"))
app.use(express.static("styles"))

app.get( '/',  (req, res) => {
    res.render('app', {
        title: "Piotr Wolski"
    })
})

app.listen(port)