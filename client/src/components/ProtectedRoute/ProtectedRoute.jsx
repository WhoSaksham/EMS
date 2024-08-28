import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { warn } from '../../helpers/toast';
import { PAGE_NOT_ACCESSIBLE } from '../../constants/stringConstants';
import { USER_DATA } from '../../constants/appConstants';
import { isEmployee } from '../../helpers';

const ProtectedRoute = ({ Component }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(USER_DATA));
        const isAuthenticated = userData?.token;

        if (!isAuthenticated) {
            navigate("/");
        } else if (isAuthenticated && (location.pathname === "/" || location.pathname === '/register')) {
            navigate(isEmployee() ? "/employees" : "/departments");
        } else if (isAuthenticated && isEmployee() && location.pathname === "/departments") {
            navigate('/employees');
            warn(PAGE_NOT_ACCESSIBLE);
        }
    }, [location.pathname]);

    return (
        <>
            {Component}
        </>
    );
}

export default ProtectedRoute;
