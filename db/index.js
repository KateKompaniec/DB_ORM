const { DATE } = require('sequelize');
const { NOW } = require('sequelize');
const  { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todolist', 'todolist_app', 'intern', {
  host: 'localhost',
  dialect: 'postgres'
});

 class List extends Model {
 }
 List.init({
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

async function getAllLists(){ 
  return await List.findAll()
} 
async function createList(listName){
  return await List.create({list_name: listName})
}

async function updateList(listName, id) {
  return await List.update({ list_name: listName}, {
    where: {
      id: id
    },
    returning: true
  })
}

async function deleteList(id) {

  return await List.destroy({
    where: {
      id: id
    },
    returning: true
  })
}

class Task extends Model {
}
Task.init({
 id: {
   type: DataTypes.INTEGER ,
   allowNull: false,
   primaryKey:true,
   autoIncrement: true,
 },
 list_id: {
  type: DataTypes.INTEGER ,
  allowNull: false,
},
 title: {
   type: DataTypes.STRING,
   allowNull: false
 },
 description: {
  type: DataTypes.STRING,
  allowNull: true
},
done: {
  type: DataTypes.BOOLEAN,
  allowNull: false
},
due_date: {
  type: DataTypes.DATE,
  allowNull: false
}
}, {
 sequelize,
 modelName: 'task',
 timestamps: false
})

List.hasMany(Task, { foreignKey: 'list_id' });
Task.belongsTo(List, { foreignKey: 'list_id' });


async function getCollectionToday(){
  //pool.query('SELECT *, lists.list_name  FROM tasks LEFT JOIN lists ON lists.id=list_id WHERE due_date = \'2022-08-11\'')
  return await Task.findAll({
    include: [{
      model: List,
      
    }],
    where: { due_date : '2022-08-12'  } 
  });

}

module.exports= {
  getAllLists,
  createList,
  updateList,
   deleteList,
  getCollectionToday
} 
