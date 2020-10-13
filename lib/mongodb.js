const { MongoClient, ObjectID, ObjectId } = require("mongodb");
const config =require("../config/config")

const mergeSort = require("../utils/sortAlgorithm/mergSort")

const DB_NAME=config.db_name
let ordenarPorPrecios = (array)=>{

}



const uri =  `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${DB_NAME}?retryWrites=true&w=majority`;




class MongoLib {
    constructor(){
        this.client= new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true  });
        this.dbName= DB_NAME
    }

    connect(){
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((resolve, reject)=>{
                this.client.connect(err=>{
                    if(err) {
                        reject(err)
                    } else {
                        resolve(this.client.db(this.dbName));
                        console.log("Connected is true", uri)}
                })  
            }) 
        }
        
        return MongoLib.connection
    };
    async getAll(collection, { estadoValue, pageValue }){
        return this.connect().then( async (db) =>{
            let minimo = 0;
            let maximo = 500;

            if(estadoValue){
                minimo = parseInt(pageValue)*100-100
                maximo = parseInt(pageValue)*100
            } 

            console.log(minimo, maximo);
            

            let response = await db.collection(collection).aggregate([
                {$match: estadoValue },
                
                {
                    $lookup:{
                        from: "prices",
                        localField: "place_id" ,
                        foreignField: "place_id",
                        as: "prices"
                    }
                },
                
                

                {
                    $project:{
                                    _id: "$_id",
                                    name: "$name",
                                    location: "$location",
                                    estado: "$estado.estado",
                                    regular: "$prices.price.regular",
                                    premium: "$prices.price.premium",
                                    diesel: "$prices.price.diesel" 
                                
                   }
                }
            
                
            ]).skip(minimo).limit(maximo).toArray()

            const responseOrdenada=mergeSort(response)            
            return responseOrdenada
        })
    };
    async getOne(collection, _id){
        return this.connect().then(db =>{
            
            return db
                .collection(collection)
                .aggregate([
                
                {
                    $match : {_id: ObjectID(_id) },
                },
                {
                    $lookup:{
                        from: "prices",
                        localField: "place_id" ,
                        foreignField: "place_id",
                        as: "prices",
                    }
                },
                {
                    $project:{
                                    _id: "$_id",
                                    name: "$name",
                                    location: "$location",
                                    estado: "$estado.estado",
                                    place: "$regu",
                                    regular: "$prices.price.regular",
                                    premium: "$prices.price.premium",
                                    diesel: "$prices.price.diesel" 
                                }
                }
            ]).toArray() 
        })
    };

    async updateOne(collection, _id, estado){
        return this.connect().then(db=>{
            db
            .collection(collection)
            .updateOne( {_id: ObjectID(_id)},
                        {$set: { estado } }, 
                        {upsert: true })
        })
    }

}

module.exports= MongoLib