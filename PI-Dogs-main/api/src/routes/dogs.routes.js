const { Router } = require("express");
const { get_allDogs} = require("../controllers/dogs");
const { Dog, Temperament } = require("../db.js");
const axios = require ("axios")

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name
  let totalDogs = await get_allDogs()
  if (name) {
    let dogName = totalDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    dogName.length?
    res.status(200).send(dogName):
    res.status(400).send('Breed not found')
  } else {
    res.status(200).send(totalDogs) 
  }
})

router.post ("/", async (req, res)=> {
  const {name, height, weight, life_span, image, temperament, createdInDb} = req.body;

  const dogCreated = await Dog.create ({
    name,
    height,
    weight,
    life_span,
    image,
    createdInDb,
  })

  let temperamentdb = await Temperament.findAll({
    where: {name : temperament}
  })

  dogCreated.addTemperament(temperamentdb)
  
})
  /////////////////////////////////////////////////////////////////////////////////

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//       const res2 = await get_oneDogDb(id);
//       console.log(res2);
//       res.status(200).send(res2);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

///////////////////////////////////////////////////////////////////

// router.post('/', async (req, res) => {
//   const {name, height, weight, life_span, image, temperament, createInDb} = req.body;

//   try {
//     if (!name || !height || !weight || !life_span || !image || !temperament) {
//       throw Error ('Missing Field');
//     } else {
//       const newDog = await createDog(name, height, weight, life_span, image, createInDb, temperament);
//       res.status(200).json(newDog);
//     }
    
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });



module.exports = router;
