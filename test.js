const setProductId = () => {
    const products = [
        {
            id: "P1",
            title: "Titulo 1",
            description: "Descripcion 1"
        },
        {
            id: "P2",
            title: "Titulo 2",
            description: "Descripcion 2"
        }
    ];
    let maxId = Math.max(...products.map(p => (p.id.split(""))[1]));
    if (maxId === -Infinity){
        maxId = 0;
    }
    let newProductId = maxId + 1;
    newProductId = "P" + newProductId;
    return newProductId;
}

console.log(setProductId());
