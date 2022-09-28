const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://Jatin:hello@ac-cwrblw4-shard-00-00.w9tgsvp.mongodb.net:27017,ac-cwrblw4-shard-00-01.w9tgsvp.mongodb.net:27017,ac-cwrblw4-shard-00-02.w9tgsvp.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-fk3wee-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(8080)