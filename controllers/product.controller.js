const Product = require('../models').products;

const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

async function getProductById(req, res) {
  const { productId } = req.params;
  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
}

const createProduct = async (req, res) => {
  const { product, price, stock } = req.body;
  const newProduct = await Product.create({ product, price, stock });
  res.json(newProduct);
};

const updateProduct = async (req, res) => {
  let { productId } = req.params;
  let product = Product.findByPk(productId);
  if (product) {
    let {newProductName, newPrice, newStock} = req.body;
    console.log(newProductName, newPrice, newStock);
    if (newProductName != undefined || newPrice != undefined || newStock != undefined) {
      await Product.update({
        product: newProductName || product.product,
        price: newPrice || product.price,
        stock: newStock || product.stock
      }, {
        where: {
          product_id: productId
        }
      });
      res.status(200).json({ message: `Product "${productId}" updated successfully` });
    } else {
      res.status(404).json({ message: `Faltan nuevos datos` });
    }
  } else {
    res.status(404).json({ message: `Product not found` });
  }
}

const deleteProduct = async (req, res) => {
  let productId = req.params.productId;
  let product = await Product.findByPk(productId);
  if (product) {
    await Product.destroy({
      where: {
        product_id: productId
      }
    });
    res.status(200).json({ message: `Product "${productId}" deleted successfully` });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};