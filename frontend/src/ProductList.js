import React, { useEffect, useMemo, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress,
  Button, Box, Typography, TextField
} from '@mui/material';
import httpInjectorService from './services/http-injector.service';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await httpInjectorService.listProducts();
      setProducts(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleSave = async () => {
    if (!csvFile) {
      alert('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      setUploading(true);
      const response = await httpInjectorService.addProducts(formData);

      alert('File uploaded successfully!');
      console.log(response.data);

      getProducts();
    } catch (error) {
      console.error('Error uploading CSV:', error);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

const filteredProducts = products.filter((product) =>
  product?.product_name
    ?.toLowerCase()
    ?.includes(searchTerm.toLowerCase().trim())
);

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2
        }}
      >
        {/* Search Bar
        <TextField
          label="Search Product"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        /> */}

        {/* Upload + Save */}
        <Box>
          <Button variant="outlined" component="label" sx={{ mr: 2 }}>
            Upload File
            <input
              type="file"
              accept=".xls,.xlsx,.csv"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={uploading}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Save'
            )}
          </Button>
        </Box>
      </Box>

      {/* Products Table */}
      <TableContainer component={Paper} elevation={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ width: '120px' }}>
                  <b>Product ID</b>
                </TableCell>

                {/* Fixed width for Product Name */}
                <TableCell
                  sx={{
                    width: '220px',
                    maxWidth: '220px'
                  }}
                >
                  <b>Name</b>
                </TableCell>

                {/* Fixed width for Category */}
                <TableCell
                  sx={{
                    width: '160px',
                    maxWidth: '160px'
                  }}
                >
                  <b>Category</b>
                </TableCell>

                <TableCell align="center" sx={{ width: '120px' }}>
                  <b>Price</b>
                </TableCell>

                <TableCell align="center" sx={{ width: '100px' }}>
                  <b>Rating</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.product_id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? '#fafafa' : 'white'
                    }}
                  >
                    <TableCell>{product.product_id}</TableCell>

                    {/* Product Name with ellipsis */}
                    <TableCell
                      sx={{
                        width: '220px',
                        maxWidth: '220px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.product_name}
                    </TableCell>

                    {/* Category with ellipsis */}
                    <TableCell
                      sx={{
                        width: '160px',
                        maxWidth: '160px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.category}
                    </TableCell>

                    <TableCell align="center">
                      {product.actual_price}
                    </TableCell>

                    <TableCell align="center">
                      {product.rating}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No products available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default ProductList;