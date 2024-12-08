const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  const q = req.query.q
  const apiKey = req.query.apiKey

  if (!q) {
    return res.status(400).json({
      error: "Provide query"
    })
  }

  if (!apiKey) {
    return res.status(403).json({
      error: "Input parameter 'apiKey'!"
    })
  } else if (!allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "API key not found"
    })
  }

  const url = `https://api.giftedtech.my.id/api/search/lyrics?apikey=gifted&query=${q}`
  
  try {
    const response = await axios.get(url) // Make the API request
    const data = response.data // Extract the data from the response

    const info = {
      Founder: "RAMADHAN ALPHA", // Only include H4KI XER
      company: "RAMAH BOTS",
      data: data.result // Assign the fetched data here
    }

    res.status(200).json(info) // Send the response
  } catch (error) {
    res.status(500).json({
      error: "Error: Request failed",
      details: error.message // Include error details for debugging
    })
  }
}

// https://api.giftedtech.my.id/api/search/lyrics?apikey=gifted&query=
