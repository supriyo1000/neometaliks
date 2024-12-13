// // src/PrivateRoute.js
// import React from 'react';
// import { Route, useNavigate } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, allowedRoles, userRole, ...rest }) => {

//     const navigate = useNavigate();

//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 if (allowedRoles.includes(userRole)) {
//                     return <Component {...props} />;
//                 } else {
//                     return navigate("/forbidden");
//                 }
//             }}
//         />
//     );
// };

// export default PrivateRoute;


// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, allowedRoles }) {
    // Simulate user role for demonstration purposes
    const userRole = 'Admin'; // Replace this with the actual user role from your state

    if (!userRole || !allowedRoles.includes(userRole)) {
        // User doesn't have access, you can redirect to a restricted page
        return <Navigate to="/unauthorized" />;
    }

    // User has access, render the provided element (component)
    return element;
}

export default PrivateRoute;

