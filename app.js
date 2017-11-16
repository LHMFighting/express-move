var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session) // 将connect的session持久化到mongodb中
var logger = require('morgan')
var port = process.env.PORT || 4000
var app = express()
var dbUrl = 'mongodb://localhost/movie'

mongoose.Promise = global.Promise
mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

if ('development' === app.get('env')) {
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

require('./config/routes')(app)

app.locals.moment = require('moment')
app.listen(port)

console.log('imooc started on port ' + port)
