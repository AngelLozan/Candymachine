import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

// Extending interface on TS says we want to extend it by something else we need on this interface and the interface inherits all values and we also add value RouteProps.
interface Props extends RouteProps { 
	isAuth: boolean;
}

const ProtectedRoute = ({ isAuth, ...routeProps }: Props) => {
	if (isAuth) {
		return <Route { ...routeProps} />; // Pass all props that come from the route without the isAuth value (which means they are not authorized so they go to the protected route)
	}
	return <Navigate to='/login' />;
};

export default ProtectedRoute;