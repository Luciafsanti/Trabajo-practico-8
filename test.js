//const setProductId = () => {
//    const products = [
//        {
//            id: "P1",
//            title: "Titulo 1",
//            description: "Descripcion 1"
//        },
//        {
//            id: "P2",
//            title: "Titulo 2",
//            description: "Descripcion 2"
//        }
//    ];
//    let maxId = Math.max(...products.map(p => (p.id.split(""))[1]));
//    if (maxId === -Infinity){
//        maxId = 0;
//    }
//    let newProductId = maxId + 1;
//    newProductId = "P" + newProductId;
//    return newProductId;
//}
//
//console.log(setProductId());
//

let dataFile = [
  {
    id: 'P1',
    name: 'Producto 1',
    description: 'descripcion 1',
    stock: '5',
    price: '10'
  },
  {
    id: 'P2',
    name: 'Producto 2',
    description: 'descripcion 2',
    stock: '5',
    price: 'aaaaaaa'
  },
  {
    id: 'P3',
    name: 'Producto 2',
    description: 'descripcion 2',
    stock: '5',
    price: 'aaaaaaa'
  },
  {
    id: 'P4',
    name: 'Producto 2',
    description: 'descripcion 2',
    stock: '5',
    price: 'aaaaaaa'
  }
]

//let productos = data.map(p => "id: " + p.id + "; name: " + p.name + "; description: " + p.description + "; price: " + p.price + "; stock: " + p.stock);

//console.log(productos);

const deleteObject = (idDelete, dataPath) => {
  let data = [...dataFile];
  if (data.some(object => object.id === idDelete)) {
    //console.log(idDelete, data[data.indexOf(data.find(object => object.id === idDelete))]);
    //console.log(data.indexOf(data.find(object => object.id === idDelete)));
    data.splice(data.findIndex(object => object.id === idDelete), 1);
    console.log(data);
    //fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  }
  else {
    console.log(`ID: ${idDelete} no existe`);
    return;
  }
}

deleteObject("P2");
