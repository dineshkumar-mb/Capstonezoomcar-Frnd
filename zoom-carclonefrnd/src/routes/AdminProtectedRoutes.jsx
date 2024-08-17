
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import jwtDecode from 'jwt-decode';

// // Admin protected route for admin users
// export function AdminProtectedRoute({ element }) {
//   const { user } = useSelector((state) => state.auth);

//   // If the user state is undefined, show a loading indicator
//   if (user === undefined) {
//     return <div>Loading...</div>;
//   }

//   // If the user is not authenticated, redirect to the login page
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   // Decode the JWT token to extract the user role
//   const decodedToken = jwtDecode(user.token);
//   const userRole = decodedToken.role;

//   // Check if the user is an admin
//   if (userRole === 'admin') {
//     return element;
//   }

//   // If the user is not an admin, redirect to the login page
//   return <Navigate to="/login" />;
// }
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function AdminProtectedRoute({ element }) {
  const { user } = useSelector((state) => state.auth);

  // If user is not authenticated or role is not admin, redirect
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return element;
}

export function ProtectedRoute({ element }) {
  const { user } = useSelector((state) => state.auth);

  return user ? element : <Navigate to="/login" />;
}