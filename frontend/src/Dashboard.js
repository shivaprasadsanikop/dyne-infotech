import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import httpInjectorService from './services/http-injector.service';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    productsPerCategory: [],
    topReviewedProducts: [],
    discountDistribution: [],
    categoryAverageRating: [],
  });

  const getDashboardData = async () => {
    try {
      const response = await httpInjectorService.getDashboardData();

      console.log('API RESPONSE:', response);

      // Adjust according to your API structure
      const data = response?.data || response || {};

      setDashboardData({
        productsPerCategory: data?.productsPerCategory || [],
        topReviewedProducts: data?.topReviewedProducts || [],
        discountDistribution: data?.discountDistribution || [],
        categoryAverageRating: data?.categoryAverageRating || [],
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // ================= PRODUCTS PER CATEGORY =================

  const productsPerCategoryOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories:
        dashboardData?.productsPerCategory
          ?.slice(0, 10)
          ?.map((item) => item.category.split('|').pop()) || [],
      labels: {
        rotate: -45,
      },
    },
    title: {
      text: 'Products per Category',
      align: 'center',
    },
  };

  const productsPerCategorySeries = [
    {
      name: 'Products',
      data:
        dashboardData?.productsPerCategory
          ?.slice(0, 10)
          ?.map((item) => Number(item.product_count)) || [],
    },
  ];

  // ================= TOP REVIEWED PRODUCTS =================

  const topReviewedProductsOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories:
        dashboardData?.topReviewedProducts?.map((item) =>
          item.product_name.length > 35
            ? item.product_name.substring(0, 35) + '...'
            : item.product_name
        ) || [],
    },
    title: {
      text: 'Top Reviewed Products',
      align: 'center',
    },
  };

  const topReviewedProductsSeries = [
    {
      name: 'Reviews',
      data:
        dashboardData?.topReviewedProducts?.map((item) =>
          Number(item.rating_count)
        ) || [],
    },
  ];

  // ================= DISCOUNT DISTRIBUTION =================

  const discountDistributionOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories:
        dashboardData?.discountDistribution?.map(
          (item) => `${item.discount_range}%`
        ) || [],
      title: {
        text: 'Discount Range',
      },
    },
    yaxis: {
      title: {
        text: 'Total Products',
      },
    },
    title: {
      text: 'Discount Distribution',
      align: 'center',
    },
  };

  const discountDistributionSeries = [
    {
      name: 'Products',
      data:
        dashboardData?.discountDistribution?.map((item) =>
          Number(item.total_products)
        ) || [],
    },
  ];

  // ================= CATEGORY AVERAGE RATING =================

  const categoryAverageRatingOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories:
        dashboardData?.categoryAverageRating
          ?.slice(0, 10)
          ?.map((item) => item.category.split('|').pop()) || [],
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      min: 0,
      max: 5,
      title: {
        text: 'Average Rating',
      },
    },
    title: {
      text: 'Category-wise Average Rating',
      align: 'center',
    },
  };

  const categoryAverageRatingSeries = [
    {
      name: 'Rating',
      data:
        dashboardData?.categoryAverageRating
          ?.slice(0, 10)
          ?.map((item) => Number(item.average_rating)) || [],
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      {/* Products per Category */}
      <div style={{ marginBottom: '50px' }}>
        <Chart
          options={productsPerCategoryOptions}
          series={productsPerCategorySeries}
          type="bar"
          height={400}
        />
      </div>

      {/* Top Reviewed Products */}
      <div style={{ marginBottom: '50px' }}>
        <Chart
          options={topReviewedProductsOptions}
          series={topReviewedProductsSeries}
          type="bar"
          height={400}
        />
      </div>

      {/* Discount Distribution */}
      <div style={{ marginBottom: '50px' }}>
        <Chart
          options={discountDistributionOptions}
          series={discountDistributionSeries}
          type="bar"
          height={400}
        />
      </div>

      {/* Category-wise Average Rating */}
      <div style={{ marginBottom: '50px' }}>
        <Chart
          options={categoryAverageRatingOptions}
          series={categoryAverageRatingSeries}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default Dashboard;