// [ "5f825458844384a6a2e5c000" , "" ]


const axios = require("axios")                                                                                           
const MongoLib = require("../lib/mongodb")

const MongoClass = new MongoLib()

const {gasolineras} =require("../utils/mocks/stations")
// let googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=AIzaSyC46Ik1GVENPomcHuvFXXYJQh7l2lxkqSk` 


const collec = "places"      
 
MongoClass.getAll(collec, {})
    .then(data => {
        
        const obtenerbicacion = (array, cb)=>{
            for (let i = 0; i <   array.length   ; i++) {
                let estado
                let data
                //
                let latitud= array[i].location.latitud
                
                let longitud= array[i].location.longitud
                /* PETICION DE GEOLOCALIZACION  INICIO*/     
                // console.log(`${longitud},${latitud}`);
                /* LONGITUD ES NEGATIVO--- Y LATITUD POSITIVO+++ 19.26505,-99.00661 ,*/        
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${longitud},${latitud}&result_type=administrative_area_level_1&key=AIzaSyC46Ik1GVENPomcHuvFXXYJQh7l2lxkqSk`)
                    .then(e=>{
                         data=e.data.results
                        /* Data de la ubicacion geografica inicio */
                         estado={

                            estado:{
                                long_name : data[0].address_components[0].long_name,
                                short_name : data[0].address_components[0].short_name   
                            }                       
                        }
                        
                        
                    })
                    .then(()=>{
                        console.log("ID ====",array[i]._id);
                        console.log("latitud =======",array[i].location.latitud);
                        console.log("longitud =======",array[i].location.longitud);
                        
                        // console.log("Addres ======",data[0].formatted_address);

                        // console.log(data[3].address_components[0]);
                        console.log(estado);
                        console.log("=======================");
                        
                        MongoClass.updateOne("places", array[i]._id, estado)
 
                    })
 
                    .catch(err=>console.log(err));
                    /*Logs de insert */
                    
                }
            }
        
        obtenerbicacion(data)
            // console.log(data);
        // process.exit(1)

    })




    
   
