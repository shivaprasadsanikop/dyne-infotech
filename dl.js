// dl/productDL.js
 
const db = require('./db');
 
async function addProduct(product) {
  // console.log('Adding product to database:', product);
  const query = `
    INSERT INTO products (
      product_id,
      product_name,
      category,
      discounted_price,
      actual_price,
      discount_percentage,
      rating,
      rating_count,
      about_product,
      user_name,
      review_title,
      review_content
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
    )
    RETURNING *
  `;
 
  const values = [
    product.product_id,
    product.product_name,
    product.category,
    product.discounted_price,
    product.actual_price,
    product.discount_percentage,
    product.rating,
    product.rating_count,
    product.about_product,
    product.user_name,
    product.review_title,
    product.review_content,
  ];
 
  const result = await db.query(query, values);
 
  return result.rows[0];
}
 
async function getAllProducts() {
  const result = await db.query(
    'SELECT * FROM products'
  );
 
  return result.rows;
}
 
async function getDashboardData() {
 
  // 1. Products Per Category
  const productsPerCategory =
    await db.query(`
      SELECT
        category,
        COUNT(*) AS product_count
      FROM products
      GROUP BY category
      ORDER BY product_count DESC
    `);
 
  // 2. Top Reviewed Products
  const topReviewedProducts =
    await db.query(`
      SELECT
        product_name,
        rating_count
      FROM products
      WHERE rating_count IS NOT NULL
      ORDER BY rating_count DESC
      LIMIT 10
    `);
 
  // 3. Discount Distribution
  const discountDistribution =
    await db.query(`
      SELECT
        FLOOR(discount_percentage * 100 / 10) * 10
          AS discount_range,
 
        COUNT(*) AS total_products
 
      FROM products
 
      WHERE discount_percentage IS NOT NULL
 
      GROUP BY discount_range
 
      ORDER BY discount_range
    `);
 
  // 4. Category-wise Average Rating
  const categoryAverageRating =
    await db.query(`
      SELECT
        category,
        ROUND(AVG(rating), 2)
          AS average_rating
 
      FROM products
 
      WHERE rating IS NOT NULL
 
      GROUP BY category
 
      ORDER BY average_rating DESC
    `);
 
  return {
    productsPerCategory:
      productsPerCategory.rows,
 
    topReviewedProducts:
      topReviewedProducts.rows,
 
    discountDistribution:
      discountDistribution.rows,
 
    categoryAverageRating:
      categoryAverageRating.rows,
  };
}
 
module.exports = {
  addProduct,
  getAllProducts,
  getDashboardData,
};