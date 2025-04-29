import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login';
import AppLayout from '@/components/layout/AppLayout';

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
