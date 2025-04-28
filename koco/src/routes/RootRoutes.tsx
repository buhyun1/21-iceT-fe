import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
