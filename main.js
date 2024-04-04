//Function imports
const {
    getUsers,
    checkDuplicates,
    addUser,
    getRank,
} = require("./Functions/Table/index.js")
const { sendMessage } = require("./Functions/Contact/index.js")
const { sendTimesheetEmail, test } = require("./Functions/UltimateRoofingTemp/index.js")

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
app.route('/duplicate/:name').get(checkDuplicates)
app.route('/rank/:name').get(getRank)
app.route('/message').post(sendMessage)
app.route('/timesheet_email').post(sendTimesheetEmail)
app.route('/test').get(test)
        