import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';

interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole?: 'admin' | 'user';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                       children,
                                                       requiredRole
                                                   }) => {
    const {
        isAuthorized,
        role
    } = useSelector((state: RootState) => state.user);

    if (!isAuthorized) {
        return <Navigate to="/sign_in"/>;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/"/>;
    }

    return (<>
        {children}
    </>);
};

export default PrivateRoute;
