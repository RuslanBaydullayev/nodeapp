const {Router} = require('express')
const router = Router()
const Cars = require('../modeles/cars')
router.get('/',async(req,res)=>{
    const cars = await Cars.find().lean()
    res.render('cars',{
        title: 'Avtomobillar ro`yhati',
        cars
    })
})
router.get('/new',(req,res)=>{
    res.render('newcar',{
        title: 'Yangi avtomobil'
    })
})
router.get('/edit/:id',async(req,res)=>{
    const car = await Cars.findById(req.params.id).lean()
    res.render('editcar',{
        title: `${car.model} ni tahrirlash`,
        car
    })
})
router.post('/save',async(req,res)=>{
    const {_id} = req.body
    delete req.body._id
    await Cars.findByIdAndUpdate(_id,req.body)
    res.redirect('/cars') 
})

router.get('/delete/:id',async(req,res)=>{
    await Cars.findByIdAndDelete(req.params.id)
    res.redirect('/cars')
})
router.get('/show/:id',async(req,res)=>{
    const car = await Cars.findById(req.params.id).lean()
    res.render('car',{
        title: `${car.model} ning batafsil ma'lumoti`,
        car
    })
})
router.post('/add', async(req,res)=>{
    const car = await new Cars({
        model: req.body.model,
        color: req.body.color,
        distance: req.body.distance,
        year: req.body.year
    })
    car.save()
    res.redirect('/cars')
})
module.exports = router