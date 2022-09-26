const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')

const PORT = 8000

const app = express()

app.listen(PORT, () => console.log(`PORT is running on: ${PORT}`))