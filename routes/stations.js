const express = require("express")

const StationsService = require("../services/stations")

let LocationsRotes =(app)=>{
    //router
    const router = express.Router()
    app.use("/api/stations", router)
    //Servicio Stations
    const stationsService = new StationsService()
    //Logica

    router.get("/", async (request, response)=>{
        const {estado}= request.query
         
        try {
            const stations = await stationsService.getAll({estado})
            response.status(200).json({
                message:"Stations with prices",
                data: stations,
                
            })
        } catch (err) {
            console.log(err);
        }
    });
    

    router.get("/:_id", async (request, response)=>{
      const {_id}=request.params

      try {
        const station =await stationsService.getOne(_id)
        response.status(200).json({
            message: "Station with prices",
            data: station
        })
      } catch (err) {
        console.log(err);
      }
    });

}

module.exports = LocationsRotes