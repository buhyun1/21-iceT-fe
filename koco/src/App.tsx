import '@/styles/index.css';
import RootRoutes from '@/routes/RootRoutes';
import QueryProvider from './provider/QueryProvider';

const App = () => {
  return (
    <QueryProvider>
      <RootRoutes />;
    </QueryProvider>
  );
};

export default App;
