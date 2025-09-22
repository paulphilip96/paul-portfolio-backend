//Function imports
const { getUsers, addUser, getRank } = require("./Functions/Table/index.js")
const { sendEmail } = require("./Functions/Contact/index.js")
const { getHolidays } = require("./Functions/Holiday/index.js")

//Server imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Server initialization
const port = process.env.PORT || 3002
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Construct routes
app.listen(port, () => {
	console.log(`PAUL PORTFOLIO BACKEND - PORT - ${port}`)
})
app.route('/users').get(getUsers).post(addUser)
app.route('/rank/:name').get(getRank)
app.route('/message').post(sendEmail)
app.route('/holidays/:country').get(getHolidays)