import React, { useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { Link } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAdmin } from '../../../actions/productAction';
import { allOrders } from '../../../actions/orderAction';
import { allUsers } from '../../../actions/userAction';
import Loader from '../../layout/Loader/Loader';
import MetaData from '../../layout/MetaData';

function Dashboard() {

    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);
    const { orders, loading: orderLoading } = useSelector(state => state.allOrders);
    const { users, loading: userLoading } = useSelector(state => state.allUsers);
    let outOfStock = 0;
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

    products && products.forEach((elem) => {
        if (elem.stock === 0)
            outOfStock++;
    })

    //calculate and return months as mapped
    const getMonths = (count) => {
        const temp = [...months];
        return temp.splice(0, count);
    }

    //calculate the earning data
    const getEarningData = () => {
        const temp = [];
        for (let i = 0; i < 12; i++)
            temp.push(0);
        orders.forEach((elem) => {
            const paidMonth = (new Date(elem.paidAt)).getMonth();
            temp[paidMonth] += elem.totalPrice;
        })
        return temp;
    }

    ChartJS.register(...registerables);

    //earning data graph
    const earningData = {
        labels: getMonths(12),
        datasets: [
            {
                backgroundColor: "tomato",
                hoverBackgroundColor: "rgb(214, 70, 44)",
                label: "Total Earning (₹)",
                data: getEarningData(),
            }
        ]
    }

    //products data graph
    const productData = {
        labels: ["Total Products", "In Stock", "Out of Stock"],
        datasets: [
            {
                label: "Products",
                data: [products.length, 0, 0],
                backgroundColor: ["#74bfff", "#60ce66", "#ff6868"]
            },
            {
                label: "Products",
                data: [0, products.length - outOfStock, outOfStock],
                backgroundColor: ["#74bfff", "#60ce66", "#ff6868"]
            },
        ]
    }

    //calculate the active users data
    const getActiveUsersData = () => {
        const temp = [];
        for (let i = 0; i < 12; i++)
            temp.push(0);

        //calculate the max value of expiry month of a user logged in multiple places
        for (let i = 0; i < users.length; i++) {
            let activeMonth = -1;
            for (let j = 0; j < users[i].loginExpire.length; j++) {
                const temp = (new Date(users[i].loginExpire[j].expire)).getMonth();
                if (temp > activeMonth)
                    activeMonth = temp;
            }
            if (activeMonth !== -1)
                temp[activeMonth] += 1;
        }
        return temp;
    }

    //calculate the total users data
    const getTotalUsersData = () => {
        const temp = [];
        for (let i = 0; i < 12; i++)
            temp.push(0);

        users.forEach((elem) => {
            const month = (new Date(elem.createdAt)).getMonth();
            temp[month] += 1;
        })
        return temp;
    }

    //users data graph
    const usersData = {
        labels: getMonths(12),
        datasets: [
            {
                label: "Total Users",
                data: getTotalUsersData(),
                backgroundColor: "tomato",
                borderColor: "#ff796180",
                fill: {
                    target: "origin",
                    above: "#ffd6ce87"
                }
            },
            {
                label: `Active Users`,
                data: getActiveUsersData(),
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

    useEffect(() => {
        dispatch(getProductAdmin());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [dispatch])


    return (
        loading || orderLoading || userLoading ?
            <Loader /> :
            <div className='dashboard'>
                <MetaData title={`myStore Admin - Dashboard`} />
                <Sidebar />

                <div className="dashboardContainer">
                    <h1>Dashboard</h1>
                    <div className="tiles">
                        <Link to="/admin/users">
                            <PeopleAltRoundedIcon />
                            <p>Total Users</p>
                            <div>{users.length}</div>
                        </Link>
                        <Link to="/admin/products">
                            <PeopleAltRoundedIcon />
                            <p>Total Products</p>
                            <div>{products.length}</div>
                        </Link>
                        <Link to="/admin/orders">
                            <PeopleAltRoundedIcon />
                            <p>Total Orders</p>
                            <div>{orders.length}</div>
                        </Link>
                    </div>
                    <div className="linechart">
                        <h2>Earnings</h2>
                        <Bar datasetIdKey="lineChart" data={earningData} options={options} />
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