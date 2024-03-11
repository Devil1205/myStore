import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

function Dashboard() {

    const data = {
        labels: ["", "Stock"]
    }

    return (
        <div className='dashboard'>
            <Sidebar />

            <div className="dashboardContainer">
                <h3 className='homeHeading'>Dashboard</h3>
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
                <Line datasetIdKey='userChart' data={data} />
            </div>

        </div>
    )
}

export default Dashboard