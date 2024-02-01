const path = require('path');
const dataPath = path.join(__dirname, "../model/users.json");
const CRUD = require('../controllers/CRUD');

const getProducts = (req, res) => {
    res.json(CRUD.read(dataPath));
}

const createProduct = (req, res) => {
    CRUD.create(req.body, dataPath);
}

module.exports = {
    getProducts,
    createProduct
}