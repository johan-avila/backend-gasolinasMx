const MongoLib= require("../lib/mongodb")


class StationsService {
    constructor(){
        this.mongodb= new MongoLib()
        this.collection = "places"
    }
    async getAll({estado, page }){
        
        const estadoValue = estado ? { "estado.estado.short_name":estado } : {}
        const pageValue = page ? page : 1

        

        const stations =await this.mongodb.getAll(this.collection, {estadoValue, pageValue})
        
        return stations          
    };
    async getOne(_id){
        const station  = await this.mongodb.getOne(this.collection, _id )

        return station
    }
}


module.exports= StationsService