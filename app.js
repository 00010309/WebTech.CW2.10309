var express = require('express')
var app = express();
app.set('view engine','pug')
app.use('/static', express.static('public'))
app.get('/', (req, res)=>{
    res.render('homepage')
})

app.listen(1000, err=>{
    err ? console.log(err) : console.log("The server is running on the port 1000")
})