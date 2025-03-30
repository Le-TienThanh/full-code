const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, img, type, price, rating, description, countInStock } =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct != null) {
        resolve({
          status: "OK",
          message: "The name of product is exist!",
        });
      }

      const newProduct = await Product.create({
        name,
        img,
        type,
        price,
        rating,
        description,
        countInStock,
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "Create product success!",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not exist!",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Success!",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      
      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "The product is not exist!",
        });
      }
      await Product.findByIdAndDelete(id);
      

      resolve({
        status: "OK",
        message: "Delete product success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allProduct = await Product.find();
      resolve({
        status: "OK",
        message: "Success!",
        data: allProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      // console.log("checkUser", checkUser);
      if (product === null) {
        resolve({
          status: "OK",
          message: "The product is not exist!",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS!",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { createProduct, updateProduct, getDetailsProduct, deleteProduct,
    getAllProduct
 };
