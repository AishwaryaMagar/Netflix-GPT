import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../userSlice';

const Body = () => {

  const dispatch = useDispatch();

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/browse",
        element: <Browse/>
    }
]);

useEffect(() => {

const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid, email,displayName, photoURL} = user;
      dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
      
    } else {
      // User is signed out
      dispatch(removeUser());
    }
});
})
  return (
    <div>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </div>
  )
}

export default Body;
