import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

function ProtectedRoute() {

    const { loading, isAuthenticated } = useSelector(state => state.user);

    return (
        loading === false ?
            <>
                {
                    isAuthenticated === true ?
                        <Outlet /> :
                        <Navigate to="/login" />
                }
            </> :
            <Loader />
    )
}

export default ProtectedRoute