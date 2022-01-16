import React from "react";
import { Navigate, Route } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
} & RouteProps;

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  );
}

export default ProtectedRoute;






// import { useEffect } from 'react';
// import { Navigate, Route, RouteProps, useLocation } from 'react-router';

// export type ProtectedRouteProps = {
//   isAuthenticated: boolean;
//   authenticationPath: string;
//   redirectPath: string;
//   setRedirectPath: (path: string) => void;
// } & RouteProps;

// export default function ProtectedRoute({isAuthenticated, authenticationPath, redirectPath, setRedirectPath, ...routeProps}: ProtectedRouteProps) {
//   const currentLocation = useLocation();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setRedirectPath(currentLocation.pathname);
//     }
//   }, [isAuthenticated, setRedirectPath, currentLocation]);

//   if(isAuthenticated && redirectPath === currentLocation.pathname) {
//     return <Route {...routeProps} />;
//   } else {
//     return <Navigate to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }} />;
//   }
// };











// import React from 'react';
// import { Navigate, Route, RouteProps } from 'react-router-dom';

// // Extending interface on TS says we want to extend it by something else we need on this interface and the interface inherits all values and we also add value RouteProps.
// interface Props extends RouteProps { 
//   isAuth: boolean;
// }

// const ProtectedRoute = ({ isAuth, ...routeProps }: Props) => {
//   if (isAuth) {
//     return <Route { ...routeProps} />; // Pass all props that come from the route without the isAuth value (which means they are not authorized so they go to the protected route)
//   }
//   return <Navigate to='/signin' />;
// };

// export default ProtectedRoute;





// import React from 'react';
// import { Navigate, Route, RouteProps, useLocation } from 'react-router';

// export type ProtectedRouteProps = {
//   isAuthenticated: boolean;
//   authenticationPath: string;
//   redirectPath: string;
//   setRedirectPath: (path: string) => void;
// } & RouteProps;


// function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");
//   console.log("this", isAuthenticated);

//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Navigate to="/signin" />
//       }
//     />
//   );
// }

// export default ProtectedRoute;