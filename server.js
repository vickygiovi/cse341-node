const express = require('express')

const mongodb = require("./data/database")

const app = express()
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use("/", require("./routes"))

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
})