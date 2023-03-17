const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
  const { Dog, Temperament } = require('../db');
  const { Op }=require("sequelize")
  const{get_allTemps}= require('./temperaments');
  

  const get_allDogsApi = async () => {
    const apiUrl = await axios.get (`https://api.thedogapi.com/v1/breeds`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
           image: el.image.url,
           weight: el.weight.metric + " kg",
           height: el.height.metric + " cm",
           life_span: el.life_span,
           temperament: el.temperament,
           createdInDb: false  

        }
    })
    return apiInfo
  }

  const get_allDogsDb = async () => {
    return await Dog.findAll({        
          include: {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: []
            }
          }
        }
    )
  }

  const get_allDogs = async () => {
    const apiInfo = await get_allDogsApi()
    const dbInfo = await get_allDogsDb()
    const totalInfo = apiInfo.concat(dbInfo)
    return totalInfo
  }

  
// const createDog = async (
//   name,
//   height,
//   weight,
//   life_span,
//   image,
//   createdInDb,
//   temperament,
// ) => {

// try {
//   const responseDb = await Dog.findAll({
//     where: {
//       name: {
//         [Op.iLike]: `%${name}%`,
//       },
//     },
//   });
//   if (responseDb.length) return 'Ya existe un perro con ese nombre';

//   const newDog = await Dog.create({
//     name: name,
//     height: height,
//     weight: weight,
//     life_span: life_span,
//     image: image,
//     createdInDb: true,
//   });
  
//    //Verifico que la tabla de Temps esté cargada, sino la crea.

//    const  TemperamentCount = await Temperament.count();
//    if (TemperamentCount === 0) { //Verifico si ya está cargado el modelo.
//        await get_allTemps();
//    }
   
// // Asocia los temps al perro.
// const tempsEncontrados = await Promise.all(
//  Dog.temperaments.map(async (temp) => {
//    const tempEncontrado = await Temperament.findOne({ where: { name: temp } });


//    if (!tempEncontrado) {
//      throw new Error(`Tipo de ${temp} no existe`);
//    }
//    return tempEncontrado;
//  })
// );
// await newDog.addTemperament(tempsEncontrados);

// return newDog;

// } catch (error) {
//   return error.message;
// }
// };


  module.exports = { get_allDogsApi, get_allDogsDb, get_allDogs }

  