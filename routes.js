// routes/productRoutes.js
 
const express = require("express");
 
const multer = require("multer");
 
const router = express.Router();
 
const productController = require("./controller");
 
const upload = multer({
  dest: "uploads/",
});
 
router.post("/", productController.createProduct);
 
router.get("/getProducts", productController.fetchProducts);
router.get("/getDashboardData", productController.dashboardData);
 
router.post("/upload-csv", upload.single("file"), productController.uploadCSV);
 
module.exports = router;