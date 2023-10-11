import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Layout2 from '@/components/Layout2';
const InternChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from your API
    fetch('/api/admin/report4') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Process the data from the API to create the chartData object
        const departmentNames = data.map((item) => item.departmentName);
        const internCounts = data.map((item) => item.count);

        setChartData({
          labels: departmentNames,
          datasets: [
            {
              label: 'Interns by Department',
              data: internCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Adjust the color as needed
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Layout2>
      <div>
        <h2>Interns by Department Chart</h2>
        <div style={{ height: '400px', width: '600px' }}>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </Layout2>
  );
};

export default InternChart;
