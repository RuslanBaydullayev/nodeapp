const {Router} = require('express')
const Task = require('../modeles/task')
const User = require('../modeles/user')
const router = Router()
router.get('/',async(req,res)=>{
    const tasks = await Task.find().lean().populate('userID','name email').select('title status userId')
    res.render('task',{
        title:'Topshiriq royhati',
        isTasks:true,
        tasks
    })
})
router.get('/new',async(req,res)=>{
    const users = await User.find().lean()
    res.render('newtask',{
        title:'Yangi topshiriq',
        users
    })
})
router.post('/',async(req,res)=>{
    const task = await new Task({
        title: req.body.title,
        text: req.body.text,
        status: 'Pendind',
        userId: req.body.userId
    })
    task.save()
    res.redirect('/tasks')
})
module.exports = router