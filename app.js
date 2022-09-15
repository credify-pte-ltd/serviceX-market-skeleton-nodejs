const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
const v1 = require("./v1/index")

// NOTE: This needs to be updated according to the Market requirement.
const db = require("./database/models")

const app = express()
app.use(cors())
// app.use(
//   cors({
//     origin: process.env.APP_FE_ORIGIN,
//   })
// )
app.use(morgan("combined"))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.get("/", (req, res) => {
  res.send("health check")
})
app.get("/favicon.ico", (req, res) => res.status(204))
app.use("/v1", v1({ db }))

module.exports = app;
