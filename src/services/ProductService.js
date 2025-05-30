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
const getAllProduct = (limit, page, sort, filter ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      if (filter) {
        const label = filter[0];
        
        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        }).limit(limit).skip(page * limit);
        resolve({
          status: 'OK',
          message: "Success",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        })

      }
      if(sort){
       
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        
        const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);
        resolve({
          status: 'OK',
          message: "Success",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        })

      } 
      const allProduct = await Product.find().limit(limit).skip(page * limit)
      resolve({
        status: 'OK',
        message: "Success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      })
     
      
     
    } catch (e) {
      reject(e);
      // resolve({
      //   status: "ERR",
      //   message: e,
      // });
      
    }
  });
};


module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
