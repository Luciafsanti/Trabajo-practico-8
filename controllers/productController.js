const path = require('path');
const dataPath = path.join(__dirname, "../model/products.json");
const CRUD = require('./CRUD');

const getProducts = (req, res) => {
    //let productos = CRUD.read(dataPath).map(p => "id: " + p.id + "; name: " + p.name + "; description: " + p.description + "; price: " + p.price + "; stock: " + p.stock + " ");
    //res.render("newProduct", { productos: productos });
    res.json(CRUD.read(dataPath));
}

const productExists = (productId) => {
    return ([...CRUD.read(dataPath)].some(p => p.id === productId));
}

const getProductById = (req, res) => {
    let productId = req.params.productId;
    let product = CRUD.read(dataPath).find(p => p.id === productId);
    res.json(product);
}

const setProductId = () => {
    const products = CRUD.read(dataPath);
    let maxId = Math.max(...products.map(p => (p.id.split("P"))[1]));
    if (maxId === -Infinity) {
        maxId = 0;
    }
    let newProductId = maxId + 1;
    newProductId = "P" + newProductId;
    return newProductId;
}

const createProduct = (req, res) => {
    let newProduct =
    {
        id: setProductId(),
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        price: req.body.price
    }

    CRUD.create(newProduct, dataPath);
    if (productExists(newProduct.id)) {
        res.status(201).json({ message: "Product created successfully" });
    }
    else {
        res.status(404).json({ message: `Couldnt create product "${newProduct.id}"` });
    }
}

const updateProduct = (req, res) => {
    let productId = req.params.productId;
    if (productExists(productId)) {
        let product = CRUD.read(dataPath).find(p => p.id === productId);
        product.name = req.body.newName;
        product.description = req.body.newDescription;
        product.stock = req.body.newStock;
        product.price = req.body.newPrice;
        CRUD.update(product, dataPath);
        res.status(200).json({ message: "Product updated successfully" });
    }
    else {
        res.status(404).json({ message: `Cannot update, product "${productId}" not found` });
    }
}

const deleteProduct = (req, res) => {
    let productId = req.params.productId;
    if (productExists(productId)) {
        CRUD.deleteObject(productId, dataPath);
        res.status(200).json({ message: "Product deleted successfully" });
    }
    else {
        res.status(404).json({ message: `Cannot delete, product "${productId}" not found` });
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}