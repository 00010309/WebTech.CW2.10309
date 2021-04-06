var express = require('express')
var app = express();
app.set('view engine','pug')
app.use('/static', express.static('public'))
app.get('/', (req, res)=>{
    res.render('homepage')
})
const posts= ['Jack','Smith','Great']
app.get('/posts', (req, res)=>{
    res.render('posts', {posts: posts})
})
app.get('/posts/postdetail', (req, res)=>{
    res.render('postdetail')
})
app.get('/drafts/draftdetail', (req, res)=>{
    res.render('draftdetail')
})
app.get('/create', (req, res)=>{
    res.render('create')
})
app.get('/update', (req, res)=>{
    res.render('update')
})
const drafts= ['Jack','Smith','Great']
app.get('/drafts', (req, res)=>{
    res.render('drafts', {drafts: drafts})
})
app.get('/update', (req, res)=>{
    res.render('update')
})
app.listen(1000, err=>{
    err ? console.log(err) : console.log("The server is running on the port 1000")
})