const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
 const { Temperament } = require('../db');
 
//  const get_allTemps = async () => {
//  const tempsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`)
//  tempsApi.data.forEach(o => {
//      if(o.temperament) {
//          let temps = o.temperament.split(',');
//          temps.forEach(t => {
//              Temperament.findOrCreate({
//                  where:{name:t}
//              })
//          })
//      }
//  });
//  const findTemps = await Temperament.findAll()
// }
     

//  module.exports = {get_allTemps}