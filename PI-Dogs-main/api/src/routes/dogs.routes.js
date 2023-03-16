const { Router } = require("express");
const {
  get_allDogsApi,
  get_allDogsDb,
  get_allDogs,  
} = require("../controllers/dogs");
const { Dog, Temperament } = require("../db.js");

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

// router.post("/", async (req, res) => {
//   const { name, image, weight, height, life_span, temperament } =
//     req.body;

//     const createdInDb = true

//   try {
//     const result = await Dog.create({
//       name,
//       image,
//       weight,
//       height,
//       life_span,      
//       temperament,
//       createdInDb
//     });

//     temperament.forEach(async (element) => {
//       const [temperament, created] = await Temperament.findOrCreate({
//         where: {
//           name: [element],
//         },
//       });
//       await result.addTemperament(temperament);
//       console.log(created);
//     });
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });


module.exports = router;
