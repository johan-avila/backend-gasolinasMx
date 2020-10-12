const express = require("express")
const app = express()
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")

const {port}=require("./config/config")

const LocationsRotes = require("./routes/stations")

// ***Middlewares*** //
/* Cors */
app.use(cors())
/* Body Parse */
app.use(express.json())

//Routes
LocationsRotes(app)
app.use("/", swaggerUI.serve, swaggerUI.setup(require("./swagger.json")))

//Server listen
app.listen(port, ()=>{
    console.log(`http://localhost:${port}/api/stations`);
})

