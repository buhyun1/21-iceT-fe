import '@/styles/index.css';
import RootRoutes from '@/routes/RootRoutes';
import QueryProvider from './provider/QueryProvider';
import GoogleAnalytics from '@/utils/GoogleAnalytics';

const App = () => {
  console.log('hellow');

  return (
    <QueryProvider>
      <GoogleAnalytics />
      <RootRoutes />
    </QueryProvider>
  );
};

export default App;
