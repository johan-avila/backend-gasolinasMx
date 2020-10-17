const express = require("express")

const StationsService = require("../services/stations")

/* Cache */
const cacheResponse = require("../utils/cacheResponse")
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS} = require("../utils/time")
/* Cache */


let LocationsRotes =(app)=>{
    //router
    const router = express.Router()
    app.use("/api/stations", router)
    //Servicio Stations
    const stationsService = new StationsService()
    //Logica

    router.get( "/" , async (request, response)=>{

      cacheResponse(response, SIXTY_MINUTES_IN_SECONDS)

        const { estado, page }= request.query

        let nextPageNum = page ? parseInt(page)+1 : 2
        let nextPage = `https://${request.headers.host}/api/stations?page=${nextPageNum}`
        try {
            const stations = await stationsService.getAll({estado, page})
            response.status(200).json({
                message:"Stations with prices",
                nextPage: nextPage ,
                data: stations,
                
            })
        } catch (err) {
            console.log(err);
        }
    });
    

    router.get("/:_id", async (request, response)=>{
      cacheResponse(response, SIXTY_MINUTES_IN_SECONDS)

      const { _id }=request.params

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