import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Admin Login">
      <LoginForm role="admin" onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
