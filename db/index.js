const  { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todolist', 'todolist_app', 'intern', {
  host: 'localhost',
  dialect: 'postgres'
});

 class Task extends Model {
 }
 Task.init({
  id: {
    type: DataTypes.INTEGER ,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true,
  },
  list_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'list',
  timestamps: false
})

async function getAllTasks(){ 
  return await Task.findAll()
} 
async function createTask(listName){
  return await Task.create({list_name: listName})
}

async function updateTask(listName, id) {
  return await Task.update({ list_name: listName}, {
    where: {
      id: id
    }
  })
}

async function deleteTask(id) {

  return await Task.destroy({
    where: {
      id: id
    }
  })
}

module.exports= {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} 
