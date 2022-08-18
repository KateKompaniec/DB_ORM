const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()


router.get('/lists',getAllTasks)
router.post('/lists', createTask)
router.put('/lists/:id', updateTask)
router.delete('/lists/:id', deleteTask)
router.get('/collection/today',getCollectionToday)

function getAllTasks(req,res){
    db.getAllLists().then(result=> res.send(result))
}

function createTask(req, res){
    const listName= req.body.listName 
      db.createList(listName).then((result)=> res.send(result))
}


function updateTask(req,res){
    const listName= req.body.listName
    const id = parseInt(req.params.id)
    db.updateList(listName,id).then((result)=> res.send(result))
}

function deleteTask(req,res){
    const id = parseInt(req.params.id)
    db.deleteList(id).then((result)=> {res.send({
        status: result,
      });
    });
}

function getCollectionToday(req,res){
    db.getCollectionToday().then((result)=> res.send(result)).catch((error) => {
        return res.status(500).json({ message: error.message });
      })
}

module.exports = router