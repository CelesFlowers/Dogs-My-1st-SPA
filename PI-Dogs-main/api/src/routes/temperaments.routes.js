const { Router } = require('express');
const { get_allTemperamentsAp } = require("../controllers/temperaments.js")
const { Temperament } = require('../db.js')
const axios = require ("axios")

const router = Router()

router.get("/", async (req, res) =>{
    const tempsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`)
    tempsApi.data.forEach(o => {
        if(o.temperament) {
            let temps = o.temperament.split(',');
            temps.forEach(t => {
                Temperament.findOrCreate({
                    where:{name:t}
                })
            })
        }
    });
    const findTemps = await Temperament.findAll()
    res.status(200).send(findTemps)    
})






module.exports = router;