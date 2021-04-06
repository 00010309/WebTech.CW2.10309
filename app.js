const express = require('express')
const app = express();
const fs = require('fs')
app.set('view engine','pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res)=>{
    res.render('homepage')
})
app.get('/posts', (req, res)=>{
    fs.readFile('./data/posts.json', (err, data)=>{
        if(err) throw err 

        const posts = JSON.parse(data)

        res.render('posts', {posts: posts})
    })
})
app.get('/posts/postdetail', (req, res)=>{
    res.render('postdetail')
})
app.get('/create', (req, res)=>{
    res.render('create')
})
app.post('/create', (req, res)=>{
    if(['action']=='Post'){
        const author = req.body.Author
        const title = req.body.Title
        const post = req.body.Post
        if(author.trim()==='' || title.trim()==='' || post.trim()===''){
            res.render('create', {error: true})
        } else {
            fs.readFile('./data/posts.json', (err,data)=>{
                if(err) throw err 

                const posts = JSON.parse(data)
                
                posts.push({
                    id: id(),
                    author: author,
                    title: title,
                    post: post
                })
                fs.writeFile('./data/posts.json', JSON.stringify(posts), err=>{
                    if(err) throw err

                    res.render('create',{success: true, posts: posts})
                })  
            })
        }
    } else {
        const author = req.body.Author
        const title = req.body.Title
        const post = req.body.Post
        if(author.trim()==='' || title.trim()==='' || post.trim()===''){
            res.render('create', {error: true})
        } else {
            fs.readFile('./data/drafts.json', (err,data)=>{
                if(err) throw err 
                
                const drafts = JSON.parse(data)
                drafts.push({
                    id: id(),
                    author: author,
                    title: title,
                    post: post
                })
                fs.writeFile('./data/drafts.json', JSON.stringify(drafts), err=>{
                    if(err) throw err

                    res.render('update',{success: true, drafts: drafts})
                })
            })
        }
    }
    
})
app.get('/update', (req, res)=>{
    res.render('update')
})
app.get('/drafts', (req, res)=>{
    fs.readFile('./data/drafts.json',(err,data)=>{
        if(err) throw err 
        
        const drafts = JSON.parse(data)

        res.render('drafts', {drafts: drafts})
    })
})
app.get('/drafts/draftdetail', (req, res)=>{
    res.render('draftdetail')
})
app.get('/update', (req, res)=>{
    res.render('update')
})
app.post('/update', (req, res)=>{
    
})
app.listen(1000, err=>{
    err ? console.log(err) : console.log("The server is running on the port 1000")
})
function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}  