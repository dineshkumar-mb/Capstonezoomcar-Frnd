import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element }) {
  const { user } = useSelector((state) => state.auth);

  // If the user is authenticated, render the component; otherwise, redirect to the login page
  return user ? element : <Navigate to="/login" />;
}
