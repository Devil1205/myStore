import React from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AlignHorizontalLeftRoundedIcon from '@mui/icons-material/AlignHorizontalLeftRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';

function Sidebar() {
    return (
        <div className='sidebar'>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <Link to="/admin/dashboard">
                    <TreeItem nodeId='1' label="Dashboard" icon={<DashboardRoundedIcon />} />
                </Link>
                <Link to="/admin/orders">
                    <TreeItem nodeId='2' label="Orders" icon={<AssignmentRoundedIcon />} />
                </Link>
                <TreeItem nodeId="3" label="Products">
                    <Link to="/admin/products">
                        <TreeItem nodeId='4' label="All" icon={<AlignHorizontalLeftRoundedIcon />} />
                    </Link>
                    <Link to="/admin/product/new">
                        <TreeItem nodeId='5' label="Add" icon={<AddCircleRoundedIcon />} />
                    </Link>
                </TreeItem>
                <Link to="/admin/users">
                    <TreeItem nodeId='6' label="Users" icon={<PeopleAltRoundedIcon />} />
                </Link>
                <Link to="/admin/reviews">
                    <TreeItem nodeId='7' label="Reviews" icon={<ReviewsRoundedIcon />} />
                </Link>
            </TreeView>
        </div>
    )
}

export default Sidebar