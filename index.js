const PORT = 8000
const cheerio = require('cheerio')
const express = require('express')
const axios = require('axios')

const app = express()

const newspapers = [
    {
        name: 'insideClimateNews',
        address: 'https://insideclimatenews.org/',
    },
    {
        name: 'nasa',
        address: 'https://climate.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2C+created_at+desc&search=&category=19%2C98',
    },
    {
        name: 'guardian',
        address: 'https://www.thegurdian.com/environment/climate-crisis',
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
    }
]
const articles = []

app.get('/', (req,res) => {
    res.json('Welcome to my Climate Change API')
})

app.get('/news', (req,res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
        .then((response) => {
            const html = response.data
            //console.log(html)
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr()
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`PORT is running on: ${PORT}`))

