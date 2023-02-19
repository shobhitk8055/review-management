import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const EmployeeLogin = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Employee Login">
      <LoginForm role="user" onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
