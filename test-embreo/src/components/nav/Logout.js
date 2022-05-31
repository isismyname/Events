import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const Logout = () => {
  let nav = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    nav("/");
  };
  return (
    <div>
        <p onClick={logout} className='cursor'>Logout</p>
    </div>
  )
}
