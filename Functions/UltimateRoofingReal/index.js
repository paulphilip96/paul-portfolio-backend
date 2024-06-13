require('dotenv').config();

const { pool_temp } = require('../../config.js')
const { getFormattedDate } = require("../Helper/index.js")

let errorTemplate = {
	error: "",
	function: "",
	errorInfo: "",
	timestamp: ""
}

const getAllDataTemp = (request, response) => {
	const tableName = "ultimate_roofing_employees"

	const query = `
		SELECT email, name, employee_id, clock_in_data, clock_out_data 
		FROM ${tableName};
	`;

	pool_temp.query(query, (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "getAllData",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - getAllData", error)
			response.status(400).json([errorBlob])		
		}
		else response.status(200).json([results.rows])
	})
}

const hasValidLoginTemp = (request, response) => {
	const tableName = "ultimate_roofing_employees"
	const { username, password } = request.body;

	const query = `
		SELECT email, name, employee_id, clock_in_data, clock_out_data, admin 
		FROM ${tableName}
		WHERE LOWER(email) = LOWER($1) AND password = $2;
	`;

	pool_temp.query(query, [username, password], (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "hasValidLogin",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - hasValidLogin", error)
			response.status(400).json([errorBlob])		
		}
		else response.status(200).json([results.rows[0]])
	})
}

const clockInTemp = (request, response) => {
	const { employeeId, location, jobNumber, message, clockInTime  } = request.body;
	const timesheetInfo = {
		employeeId,
		location,
		jobNumber,
		message,
		clockInTime
	}
	const formattedTimesheetInfo = JSON.stringify(timesheetInfo);

	const query = `
		UPDATE ultimate_roofing_employees
		SET clock_in_data = jsonb_concat(clock_in_data, jsonb_build_array(CAST($1 AS json)))
		WHERE employee_id = $2;
	`;

	const query_second = `
		SELECT clock_in_data FROM ultimate_roofing_employees
		WHERE employee_id = $1
	`

	pool_temp.query(query, [formattedTimesheetInfo, employeeId], (error) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "clockIn",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - clockIn", error)
			response.status(400).json([errorBlob])		
		}
	})

	pool_temp.query(query_second, [employeeId], (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "clockIn-second-query",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - clockIn", error)
			response.status(400).json([errorBlob])		
		}
		else response.status(200).json([results.rows[0]])
	})
}

const clockOutTemp = (request, response) => {
	const { employeeId, location, clockOutTime, expenses, expensesInfo } = request.body
	const timesheetInfo = {
		employeeId,
		location,
		expenses,
		expensesInfo,
		clockOutTime,
	}
	const formattedTimesheetInfo = JSON.stringify(timesheetInfo);

	const query = `
		UPDATE ultimate_roofing_employees
		SET clock_out_data = jsonb_concat(clock_out_data, jsonb_build_array(CAST($1 AS json)))
		WHERE employee_id = $2;
	`;

	const query_second = `
		SELECT clock_out_data FROM ultimate_roofing_employees
		WHERE employee_id = $1
	`

	pool_temp.query(query, [formattedTimesheetInfo, employeeId], (error) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "clockOut",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - clockOut", error)
			response.status(400).json([errorBlob])		
		}
	})

	pool_temp.query(query_second, [employeeId], (error, results) => {
		if (error) {
			const errorBlob = {
				...errorTemplate, 
				function: "clockIn-second-query",
				errorInfo: error,
				query: query,
				timestamp: getFormattedDate()
			}
			console.log("Error - clockOut", error)
			response.status(400).json([errorBlob])		
		}
		else response.status(200).json([results.rows[0]])
	})
}

const testTemp = (req, res) => {
  res.status(200).json("Success-2");
}

module.exports = { 
	hasValidLoginTemp, 
	clockInTemp,
	clockOutTemp,
	getAllDataTemp,
	testTemp
}