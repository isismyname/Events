import { useContext, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { API, setAuthToken } from './config/API';
import { UserContext } from './context/UserContext';
import { LandingPage } from './pages/LandingPage';
import { User } from './pages/User';
import { CreateEvent } from './pages/CreateEvent';
import { Admin } from './pages/Admin';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {

  let nav = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {

    // Redirect Auth
    if (!state.isLogin) {
      nav("/");
    }else {
      if(state.user.statusUser === 'admin'){
        nav("/admin");
      }else if(state.user.statusUser === 'user'){
        nav('/user')
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Routes>
      <Route exact path='/' element={< LandingPage />} />
      <Route exact path='/user' element={< User />} />
      <Route exact path='/Add-Event' element={< CreateEvent />} />
      <Route exact path='/admin' element={< Admin />} />
    </Routes>
  );
}

export default App;
