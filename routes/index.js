const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()


router.get('/lists',getAllTasks)
router.post('/lists', createTask)
router.put('/lists/:id', updateTask)
router.delete('/lists/:id', deleteTask)


function getAllTasks(req,res){
    db.getAllTasks().then(result=> res.send(result))
}

function createTask(req, res){
    const listName= req.body.listName 
      db.createTask(listName).then((result)=> res.send(result))
}


function updateTask(req,res){
    const listName= req.body.listName
    const id = parseInt(req.params.id)
    db.updateTask(listName,id).then((result)=> res.send(result))
}

function deleteTask(req,res){
    const id = parseInt(req.params.id)
    db.deleteTask(id).then((result)=> res.send(result)).catch((error) => {
        return res.status(500).json({ message: error.message });
      })
    
}


module.exports = router