import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../../context/advisor.context.jsx';

function ProtectedRoute({ element }) {
  const { jwt } = useContext(Context);

  return jwt ? element : <Navigate to="/ma9ypwq1420s/sa9v5r3cd64q/prospects/secure/login" />;
}

export default ProtectedRoute