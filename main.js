//Function imports
const {
    getUsers,
    checkDuplicates,
    addUser,
    getRank
} = require("./Functions/Table/index.js")
const { sendMessage } = require("./Functions/Contact/index.js")
const { 
    sendClockInEmail,
    sendClockOutEmail, 
    hasValidLogin, 
    clockIn, 
    clockOut,
    test
} = require("./Functions/UltimateRoofingTemp/index.js")
const { 
    sendClockInEmailE,
    sendClockOutEmailE, 
    hasValidLoginE, 
    clockInE, 
    clockOutE,
    testE,
    getAllDataE
} = require("./Functions/UltimateRoofingEmployeesTemp/index.js")
const { 
    clockInTemp,
    clockOutTemp,
    getAllDataTemp,
    hasValidLoginTemp,
    testTemp
} = require("./Functions/UltimateRoofingReal/index.js")

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

//Ludwing
app.route('/clock_in_email').post(sendClockInEmail)
app.route('/clock_out_email').post(sendClockOutEmail)
app.route('/clock_in').post(clockIn)
app.route('/clock_out').post(clockOut)
app.route('/login').post(hasValidLogin)
app.route('/test').get(test)

app.route('/clock_in_email_e').post(sendClockInEmailE)
app.route('/clock_out_email_e').post(sendClockOutEmailE)
app.route('/clock_in_e').post(clockInE)
app.route('/clock_out_e').post(clockOutE)
app.route('/login_e').post(hasValidLoginE)
app.route('/all_data_e').get(getAllDataE)
app.route('/test_e').get(testE)

//Temp
app.route('/all_data_temp').get(getAllDataTemp)
app.route('/clock_in_temp').post(clockInTemp)
app.route('/clock_out_temp').post(clockOutTemp)
app.route('/login_temp').post(hasValidLoginTemp)
app.route('/test_temp').get(testTemp)