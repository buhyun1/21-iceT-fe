import '@/styles/index.css';
import QueryProvider from './providers/QueryProvider';
import Router from './routes/Router';
import ToastContainer from '@/shared/ui/Toast';

const App = () => {
  return (
    <QueryProvider>
      <Router />
      <ToastContainer />
    </QueryProvider>
  );
};

export default App;
