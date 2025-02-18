import { useEffect } from 'react';
import './App.css';
import { login } from '../store/UserSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { apiClient } from '../axios/axios.js';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth?.status);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    apiClient.get('/getuser', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.data) {
        if(!authStatus){
        dispatch(login(response.data));}
        navigate('/main');
      } else {
        navigate('/register');
      }
    })
    .catch((error) => {
      console.error('Failed to fetch user:', error);
      navigate('/register');
    });

  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-xl font-bold">
      Loading...
    </div>
  );
}

export default App;
