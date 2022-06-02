require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookie = require('cookie-parser')
const supervisor_route = require('./backend/api/supervisor/router')
const member_route = require('./backend/api/member/router')

app.use(express.json())
app.use(express.static(__dirname + '/frontend/public'))
app.use('/edit-project/:projectId', express.static(path.join(__dirname, './frontend/public')))
app.use('/view-project/:projectId', express.static(path.join(__dirname, './frontend/public')))
app.set('views', path.join(__dirname + '/frontend/views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(cookie())
app.use('/api/supervisor', supervisor_route)
app.use('/api/member', member_route)

require('./frontend/controller/route')(app)

app.listen(process.env.APP_PORT, () => {
    console.log('App is running on port: ', process.env.APP_PORT)
})