import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto"

const LineCharts = ({ chartData, options }) => {
    return (
        <div style={{width:"250px"}}><Line data={chartData} options={options} /></div>
    )
}

export default LineCharts;