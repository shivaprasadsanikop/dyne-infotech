import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress,
  Button, Box, Typography
} from '@mui/material';
import httpInjectorService from './services/http-injector.service';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  return (
    <Box sx={{ p: 3 }}>
      {/* File input + Save button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
          {uploading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
        </Button>
      </Box>

      {/* Products table */}
      <TableContainer component={Paper} elevation={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><b>Product ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell align="center"><b>Price</b></TableCell>
                <TableCell align="center"><b>Rating</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.length > 0 ? (
                products.map((product, index) => (
                  <TableRow
                    key={product.product_id}
                    sx={{ backgroundColor: index % 2 === 0 ? '#fafafa' : 'white' }}
                  >
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="center">{product.actual_price}</TableCell>
                    <TableCell align="center">{product.rating}</TableCell>
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
