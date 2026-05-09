// controllers/productController.js
 
const fs = require('fs');
 
const csv = require('csv-parser');
 
const productDL = require('./dl');
const XLSX = require('xlsx');
 
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
 
function cleanNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }
 
  const cleaned = String(value)
    .replace(/[₹,%|,]/g, '')
    .trim();
 
  if (cleaned === '') {
    return null;
  }
 
  const num = Number(cleaned);
 
  return isNaN(num) ? null : num;
}
 
 
 
 
 
async function uploadCSV(req, res) {
  try {
    const workbook = XLSX.readFile(req.file.path);
 
    const sheetName = workbook.SheetNames[0];
 
    // Skip first row
    const sheetData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName],
      {
        range: 1, // starts reading from row 2
      }
    );
 
    for (const row of sheetData) {
      // console.log(row);
 
      await productDL.addProduct({
        product_id: row.product_id,
        product_name: row.product_name,
        category: row.category,
        discounted_price: cleanNumber(row.discounted_price),
 
        actual_price: cleanNumber(row.actual_price),
 
        discount_percentage: cleanNumber(
          row.discount_percentage
        ),
 
        rating: cleanNumber(row.rating),
 
        rating_count: cleanNumber(row.rating_count),
        about_product: row.about_product,
        user_name: row.user_name,
        review_title: row.review_title,
        review_content: row.review_content,
      });
    }
 
    res.status(200).json({
      success: true,
      message: 'Excel uploaded successfully',
    });
 
  } catch (err) {
    console.error(err);
 
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
 
async function dashboardData(req, res) {
  try {
 
    const data =
      await productDL.getDashboardData();
 
    res.status(200).json({
      success: true,
      data,
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
  dashboardData,
};