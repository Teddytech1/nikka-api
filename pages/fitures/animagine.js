//https://rest.cifumo.biz.id/api/ai/animagine?prompt=Ball
const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  const prompt = req.query.prompt
  const apiKey = req.query.apiKey

  if (!prompt) {
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
  

  const url = `https://itzpire.com/ai/lofi?prompt=${prompt}`

  try {
    const response = await axios.get(url) // Make the API request
    const data = response.data // Extract the data from the response

    const info = {
      Founder: "H4KI XER", // Only include H4KI XER
      company: "Nikka Botz Inc",
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

//https://itzpire.com/ai/lofi?prompt=Ball
