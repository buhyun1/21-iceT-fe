import '@/styles/index.css';
import RootRoutes from '@/routes/RootRoutes';
import QueryProvider from './provider/QueryProvider';

const App = () => {
  console.log('hellow');

  return (
    <QueryProvider>
      <RootRoutes />
    </QueryProvider>
  );
};

export default App;
