import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './screens/login.jsx'
import Register from './screens/register.jsx'
 import Main from './screens/main.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store/store.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }, {
    path: "/main",
    element: <Main />,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       
  <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
)
