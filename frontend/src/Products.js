import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductList from './ProductList';
import Dashboard from './Dashboard';

// Generic TabPanel helper
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Products = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tab headers */}
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Products" />
        <Tab label="Dashboard" />

      </Tabs>

      {/* Tab content panes */}
      <TabPanel value={value} index={0}>
        {/* Replace with your Products component */}
        <ProductList />
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Replace with your Reviews component */}
       <Dashboard />
      </TabPanel>
      
    </Box>
  );
};

export default Products;
