const express = require('express')

const mongodb = require("./data/database")

const app = express()
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use("/", require("./routes"))

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
})