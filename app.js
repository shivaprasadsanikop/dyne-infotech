// app.js

require('dotenv').config();

const express = require('express');

const app = express();

const productRoutes = require(
 './routes'
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Running...');
});

app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});