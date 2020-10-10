const express = require("express")
const app = express()

const {port}=require("./config/config")

const LocationsRotes = require("./routes/stations")

// ***Middlewares*** //
/* Body Parse */
app.use(express.json())

//Routes
LocationsRotes(app)

//Server listen
app.listen(port, ()=>{
    console.log(`http://localhost:${port}/api/stations`);
})

