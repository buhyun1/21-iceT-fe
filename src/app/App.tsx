import '@/styles/index.css';
import QueryProvider from './providers/QueryProvider';
import Router from './routes/Router';

const App = () => {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
};

export default App;
