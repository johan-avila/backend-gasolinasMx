const { MongoClient, ObjectID, ObjectId } = require("mongodb");
const config =require("../config/config")

const DB_NAME=config.db_name



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
    async getAll(collection, query){
        return this.connect().then(db =>{
            console.log(query);
            return db.collection(collection).aggregate([
                {$match: query },
                {$limit:100},          
                {
                    $lookup:{
                        from: "prices",
                        localField: "place_id" ,
                        foreignField: "place_id",
                        as: "prices"
                    }
                }
            ]).toArray() 
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
                }
            ]).toArray() 
        })
    };
    async updateOne(collection, _id, estado){
        return this.connect().then(db=>{
            db
            .collection(collection)
            .updateOne( {_id: ObjectID(_id)},
                        {$set: { estado:estado } }, 
                        {upsert: true })
        })
    }

}

module.exports= MongoLib


// db.stations.find({"_id" : ObjectId("5f7d4b2eb3996a466034487f")})

// db.stations.updateOne(  {"_id" : ObjectId("5f7d4b2eb3996a466034487f")},
// {$set : {estado: {
//                             long_name: 'Baja California',
//                             short_name: 'B.C.',
//                             types: [ 'administrative_area_level_1', 'political' ]
//                           }}}  )