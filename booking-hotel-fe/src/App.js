import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import TheFooter from './containers/layout/TheFooter';
import TheHeader from './containers/layout/TheHeader';
import AppRoutes from './routes/AppRoutes';

function App() {
  const user = useSelector(state => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        {(user.role !== '') && <TheHeader />}
        <div className='content'>
          <AppRoutes />
        </div>
        {(user.role !== '') && <TheFooter />}
      </BrowserRouter>
    </div>
  );
}

export default App;
