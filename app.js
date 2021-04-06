var express = require('express')
var app = express();
app.set('view engine','pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))
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
app.get('/create', (req, res)=>{
    res.render('create')
})
app.post('/create', (req, res)=>{
    const author = req.body.Author
    const title = req.body.Title
    const post = req.body.Post
    author.trim()==='' || title.trim()==='' || post.trim()==='' ? res.render('create', {error: true}) :
    fs.readFile('./data/posts.json', (err,data)=>{
        if(err) throw err 
        const posts = JSON.parse(data)

        posts.push({
            id: id(),
            author: autor,
            title: title,
            post: post
        })
        fs.writeFile('./data/posts.json', JSON.stringify(drafts), err=>{
            if(err) throw err
            res.render('posts',{success: true})
        })
    })
})
app.get('/update', (req, res)=>{
    res.render('update')
})
const drafts= ['Jack','Smith','Great']
app.get('/drafts', (req, res)=>{
    res.render('drafts', {drafts: drafts})
})
app.get('/drafts/draftdetail', (req, res)=>{
    res.render('draftdetail')
})
app.get('/update', (req, res)=>{
    res.render('update')
})
app.post('/update', (req, res)=>{
    const author = req.body.Author
    const title = req.body.Title
    const post = req.body.Post
    author.trim()==='' || title.trim()==='' || post.trim()==='' ? res.render('create', {error: true}) :
    fs.readFile('./data/drafts.json', (err,data)=>{
        if(err) throw err 
        const drafts = JSON.parse(data)
        drafts.push({
            id: id(),
            author: autor,
            title: title,
            post: post
        })
        fs.writeFile('./data/drafts.json', JSON.stringify(drafts), err=>{
            if(err) throw err
            res.render('update',{success: true})
        })
    })
})
app.listen(1000, err=>{
    err ? console.log(err) : console.log("The server is running on the port 1000")
})
function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}