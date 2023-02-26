import { Button } from '@/components/Elements';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const MultiLogin = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Choose login type">
      <div className="row">
        <div className="col-6">
          <Button className="w-100" onClick={() => navigate('/auth/login')}>Admin Login</Button>
        </div>
        <div className="col-6">
          <Button className="w-100" onClick={() => navigate('/auth/employee-login')}>Employee Login</Button>
        </div>
      </div>
    </Layout>
  );
};
