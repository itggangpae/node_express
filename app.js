
var express = require('express')

var morgan = require('morgan')
var path = require('path')

var app = express()

var FileStreamRotator = require('file-stream-rotator')
var fs = require('fs')
var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
