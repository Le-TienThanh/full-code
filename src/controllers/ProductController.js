const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    

    const { name, img, type, price, rating, description, countInStock } = req.body;
    
    
    if (!name || !img || !type || !price || !rating  || !countInStock) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    } 
    const response = await ProductService.createProduct(req.body);
    
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};


const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    

    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const getAllProduct = async (req, res) => {
  try {
    // const {limit, page, sort, filter} = req.query
    const {limit, page, sort, filter} = req.query

    // const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);
    const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = { createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
};

// module.exports = { createUser };
