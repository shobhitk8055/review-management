import { Route, Routes } from 'react-router-dom';
import { EmployeeLogin } from './EmployeeLogin';
import { MultiLogin } from './MultiLogin';

import { Login } from './Login';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MultiLogin />} />
      <Route path="login" element={<Login />} />
      <Route path="employee-login" element={<EmployeeLogin />} />
    </Routes>
  );
};
