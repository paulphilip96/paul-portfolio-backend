const request = require("request");
const { getFormattedDate } = require("../Helper");

const getHolidays = (req, response) => {
  const requestString = `${process.env.CALENDERIFIC_URL}?api_key=${process.env.CALENDERIFIC_API_KEY}&country=${req.params.country}&year=2025`;

  request(requestString, { json: true }, (error, res, body) => {
    if (error) {
      const errorBlob = {
        error: error,
        function: "getHolidays",
        timeStamp: getFormattedDate(),
      };
      console.log("Error - getHolidays()", errorBlob);
      return response.status(400).json({ message: "Unable to retrieve holiday data" });
    }

    if (!body || !body.response || !body.response.holidays) {
      return response.status(404).json({ message: "No holiday data found" });
    }

    // Extract holiday data
    const all = body.response.holidays
      .filter((holiday) =>
        holiday.type.some((t) => t.toLowerCase() === "national holiday")
      )
      .map((holiday) => ({
        name: holiday.name,
        description: holiday.description,
        date: holiday.date.iso,
        type: holiday.type,
      }));

    console.log(all)
    return response.status(200).json({ message: "Holidays retrieved successfully", data: all });
  });
};

module.exports = { getHolidays };