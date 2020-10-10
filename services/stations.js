const MongoLib= require("../lib/mongodb")


class StationsService {
    constructor(){
        this.mongodb= new MongoLib()
        this.collection = "stations"
    }
    async getAll({estado}){
        
        const query = estado ? { "estado.estado.short_name":estado } : {}
        const stations =await this.mongodb.getAll(this.collection, query)
        console.log(stations);
        return stations           
    };
    async getOne(_id){
        const station  = await this.mongodb.getOne(this.collection, _id )

        return station
    }
}


module.exports= StationsService