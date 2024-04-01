import { useState, useContext, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Details from './pages/Details';

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function ProtectedRoute({ children }) {
    const isAuthenticated = token ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [])

    return isAuthenticated ? children : null;
  }

  return (
    <>
      <Routes>
        {/* publick route */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected routes */}
        <Route path='/' element={<ProtectedRoute isAuthenticated={token ? true : false}>
          <Home /></ProtectedRoute>} />
        <Route path='/details' element={<ProtectedRoute isAuthenticated={token ? true : false}>
          <Details /></ProtectedRoute>} />

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
