import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DashBoard from './app/dashboard.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './app/auth/login.jsx';
import SignUp from './app/auth/signup.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter([
  {path:"/", element:<DashBoard/>},
  {path:"/login", element:<Login/>},
  {path:"/signup", element:<SignUp/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </StrictMode>,
)
