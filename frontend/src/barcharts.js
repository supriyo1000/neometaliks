import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

const BarCharts = ({ chartData, options }) => {
    return (
        <div style={{width:"347px"}}><Bar data={chartData} options={options} /></div>
    )
}

export default BarCharts;