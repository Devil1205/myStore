import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

function Dashboard() {

    const getMonths = (count) => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return months.splice(0, count);
    }

    ChartJS.register(...registerables);
    const earningData = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                backgroundColor: "tomato",
                hoverBackgroundColor: "rgb(214, 70, 44)",
                label: "Total Earning",
                data: [0, 4000],
            }
        ]
    }

    const productData = {
        labels: ["Total Products", "In Stock", "Out of Stock"],
        datasets: [
            {
                label: "Total Products",
                data: [10000, 0, 0],
                backgroundColor: ["#74bfff", "#60ce66", "#ff6868"]
            },
            {
                label: "",
                data: [0, 9000, 1000],
                backgroundColor: ["#74bfff", "#60ce66", "#ff6868"]
            },
        ]
    }

    const usersData = {
        labels: getMonths(12),
        datasets: [
            {
                label: "Total Users",
                data: [2, 30, 5, 3],
                backgroundColor: "tomato",
                borderColor: "#ff796180",
                fill: {
                    target: "origin",
                    above: "#ffd6ce87"
                }
            },
            {
                label: `Active Users ${2024}`,
                data: [1, 3, 20, 3],
                backgroundColor: "#20b228",
                borderColor: "#3cb74387",
                fill: {
                    target: "origin",
                    above: "#91d79480"
                }
            },
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                rtl: false,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                }
            }
        },
    }


    return (
        <div className='dashboard'>
            <Sidebar />

            <div className="dashboardContainer">
                <h1>Dashboard</h1>
                <div className="tiles">
                    <Link to="/admin/users">
                        <PeopleAltRoundedIcon />
                        <p>Total Users</p>
                        <div>50</div>
                    </Link>
                    <Link to="/admin/products">
                        <PeopleAltRoundedIcon />
                        <p>Total Products</p>
                        <div>50</div>
                    </Link>
                    <Link to="/admin/orders">
                        <PeopleAltRoundedIcon />
                        <p>Total Orders</p>
                        <div>50</div>
                    </Link>
                </div>
                <div className="linechart">
                    <h2>Earnings</h2>
                    <Line datasetIdKey="lineChart" data={earningData} options={options} />
                </div>

                <div className="doughnutchart">
                    <h2>Products</h2>
                    <Doughnut datasetIdKey="doughnutChart" data={productData} options={options} />
                </div>

                <div className="linechart">
                    <h2>Users</h2>
                    <Line datasetIdKey='lineChart2' data={usersData} options={{ ...options, scales: { y: { min: 0, } } }} />
                </div>

            </div>

        </div>
    )
}

export default Dashboard