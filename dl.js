// dl/productDL.js

const db = require('./db');

async function addProduct(product) {
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

module.exports = {
  addProduct,
  getAllProducts,
};