var express = require('express')
var app = express();

app.get('/', (req, res)=>{
    res.send('Hello')
})

app.listen(1000, err=>{
    err ? console.log(err) : console.log("The server is running on the port 1000")
})