const express = require('express')
const app = express();
const PORT = 8080
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

        const trueposts = posts.filter(post=>post.status==true)

        res.render('posts', {posts: trueposts})
    })
})
app.get('/posts/:id', (req, res)=>{
    const id = req.params.id
    fs.readFile('./data/posts.json', (err, data)=>{
        if(err) throw err 

        const posts = JSON.parse(data)

        const post = posts.filter(post=>post.id == id)[0]

        res.render('postdetail', {post: post})
    })

})
app.get('/create', (req, res)=>{
    res.render('create')
})
app.post('/createpost', (req, res)=>{
    const author = req.body.Author
    const title = req.body.Title
    const post = req.body.Post
    if(author.trim()==='' || title.trim()==='' || post.trim()===''){
        res.render('create', {error: true})
    } else {
        fs.readFile('./data/posts.json', (err,data)=>{
            if(err) throw err 

            const posts = JSON.parse(data)

            posts.unshift({
                id: id(),
                author: author,
                title: title,
                post: post,
                status: true
            })
            fs.writeFile('./data/posts.json', JSON.stringify(posts), err=>{
                if(err) throw err

                res.render('create',{success_post: true, posts: posts})
            })  
        })
    }
})
app.post('/createdraft', (req, res)=>{ 
    const author = req.body.Author
    const title = req.body.Title
    const post = req.body.Post
    if(author.trim()==='' || title.trim()==='' || post.trim()===''){
        res.render('create', {error: true})
    } else {
        fs.readFile('./data/posts.json', (err,data)=>{
            if(err) throw err 
                
            const drafts = JSON.parse(data)
            drafts.unshift({
                id: id(),
                author: author,
                title: title,
                post: post,
                status: false
            })
            fs.writeFile('./data/posts.json', JSON.stringify(drafts), err=>{
                if(err) throw err

                res.render('create',{success_draft: true, drafts: drafts})
            })
        })
    }
})
app.get('/drafts', (req, res)=>{
    fs.readFile('./data/posts.json',(err,data)=>{
        if(err) throw err 
        
        const posts = JSON.parse(data)

        const falseposts = posts.filter(post=>post.status==false)

        res.render('drafts', {drafts: falseposts})
    })
})
app.get('/drafts/:id', (req, res)=>{
    const id = req.params.id
    fs.readFile('./data/posts.json',(err,data)=>{
        if(err) throw err 
        
        const drafts = JSON.parse(data)

        const draft = drafts.filter(draft=>draft.id == id)[0]

        res.render('draftdetail', {draft: draft})
    })

})
app.get('/:id/post', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/posts.json', (err, data) => {
        if (err) res.sendStatus(500)
    
        const drafts = JSON.parse(data)
        const draft = drafts.filter(draft => draft.id == req.params.id)[0]
        const draftIdx = drafts.indexOf(draft)
        const splicedDraft = drafts.splice(draftIdx, 1)[0]
        splicedDraft.status = true
        drafts.push(splicedDraft)
    
        fs.writeFile('./data/posts.json', JSON.stringify(drafts), err => {
          if (err) res.sendStatus(500)
    
          res.redirect('/drafts')
        })
        
      })
})
app.get('/:id/deletepost', (req,res)=>{
    const id = req.params.id

    fs.readFile('./data/posts.json', (err, data)=>{
        if(err) throw err

        const posts = JSON.parse(data)

        const filteredposts = posts.filter(post=> post.id != id)

        fs.writeFile('./data/posts.json', JSON.stringify(filteredposts), (err, data)=>{
            if(err) throw err

            res.render('posts', {posts: filteredposts, deleted: true})
        })
    }) 
    
})

app.get('/:id/deletedraft', (req,res)=>{
    const id = req.params.id

    fs.readFile('./data/posts.json', (err, data)=>{
        if(err) throw err

        const drafts = JSON.parse(data)

        const filtereddrafts = drafts.filter(draft=> draft.id != id)

        fs.writeFile('./data/posts.json', JSON.stringify(filtereddrafts), (err, data)=>{
            if(err) throw err

            res.render('drafts', {drafts: filtereddrafts, deleted: true})
        })
    })
})

app.listen(PORT, err=>{
    err ? console.log(err) : console.log("The server is running on the port " + PORT)
})
function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}  