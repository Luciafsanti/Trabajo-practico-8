const fs = require('fs');

const create = (newObject, dataPath) => {
    let data = read(dataPath);
    data.push(newObject);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const read = (dataPath) => {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

const update = (objectUpdate, dataPath) => {
    let data = read(dataPath);
    if (data.some(object => object.id === objectUpdate.id)) {
        data.forEach(object => {
            if (object.id === objectUpdate.id) {
                data[data.indexOf(object)] = objectUpdate;
                console.log(object.id, objectUpdate.id);
                fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
                return;
            }
        })
    } else {
        console.log(object.id, objectUpdate.id);
        console.log(`ID: ${objectUpdate.id} no existe`);
        return;
    }
}

const deleteObject = (idDelete, dataPath) => {
    let data = read(dataPath);
    if (data.some(object => object.id === idDelete)) {
      data.splice(data.findIndex(object => object.id === idDelete), 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }
    else {
      console.log(`ID: ${idDelete} no existe`);
      return;
    }
  }

module.exports = {
    create,
    read,
    update,
    deleteObject
}

/*Pruebas*/

//let nuevo = {
//    id: 3,
//    title: "Titulo 3",
//    description: "Descripcion 3"
//};

//create(nuevo, "../model/users.json");

//console.log(read("../model/users.json"));

//let updateObject = {
//    id: 3,
//    title: "Titulo 3 actualizado v1.2",
//    description: "Descripcion 3 nueva v1.2"
//};
//
//update(updateObject, "../model/users.json");

//let del = 3;
//
//deleteObject(del, "../model/users.json");