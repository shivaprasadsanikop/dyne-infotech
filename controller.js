// controllers/productController.js

const fs = require('fs');

const csv = require('csv-parser');

const productDL = require('./dl');

async function createProduct(req, res) {
  try {
    const product = await productDL.addProduct(
      req.body
    );

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function fetchProducts(req, res) {
  try {
    const products =
      await productDL.getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function uploadCSV(req, res) {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', async () => {
        for (const row of results) {
          await productDL.addProduct({
            product_id: row.product_id,
            product_name: row.product_name,
            category: row.category,
            discounted_price:
              row.discounted_price,
            actual_price: row.actual_price,
            discount_percentage:
              row.discount_percentage,
            rating: row.rating,
            rating_count: row.rating_count,
            about_product: row.about_product,
            user_name: row.user_name,
            review_title: row.review_title,
            review_content:
              row.review_content,
          });
        }

        res.status(200).json({
          success: true,
          message:
            'CSV data uploaded successfully',
        });
      });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  createProduct,
  fetchProducts,
  uploadCSV,
};