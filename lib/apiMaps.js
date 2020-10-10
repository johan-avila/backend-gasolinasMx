const axios = require("axios")                                                                                           
const MongoLib = require("../lib/mongodb")

const MongoClass = new MongoLib()

const {gasolineras} =require("../utils/mocks/stations")
let googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=19.26505,-99.00661&key=AIzaSyC46Ik1GVENPomcHuvFXXYJQh7l2lxkqSk&location_type=geometric_center` 


const collec = "places"      
 MongoClass.getAll(collec, {})
    .then(data => {
        
        const obtenerbicacion = (array, cb)=>{
            for (let i = 0; i <  1/* array.length */  ; i++) {
                
                let _id= array[i]._id
                let latitud = array[i].location.latitud
                let longitud = array[i].location.longitud
                console.log(_id, latitud, longitud);

                
                
                /* PETICION DE GEOLOCALIZACION  INICIO*/     
                /* LONGITUD ES NEGATIVO--- Y LATITUD POSITIVO+++ 19.26505,-99.00661 ${latitud},${longitud}*/        
                axios.get( `https://maps.googleapis.com/maps/api/geocode/json?latlng=32.47641,-116.9214&key=AIzaSyC46Ik1GVENPomcHuvFXXYJQh7l2lxkqSk`)
                .then(e=>{
                        const data=e.data.results[1]
                        console.log(e);
                        const estado={
                            formatted_address: data.formatted_address,
                            estado:{
                                long_name:data.address_components[4].long_name,
                                short_name:data.address_components[4].short_name
                            },
                            ciudad:{
                                long_name:data.address_components[3].long_name,
                                short_name:data.address_components[3].short_name
                            },                       
                        }
                        MongoClass.updateOne(collec, _id , estado )
                
                    })
                    // .catch(err=>console.log(err));
                    /* PETICION DE GEOLOCALIZACION  TERMINA*/ 
                }
            }
        
        obtenerbicacion(data)
          
    })



    
    // MongoClass.getAll(collec, {})
    //     .then(e=>{
//         console.log(e);
//     })

