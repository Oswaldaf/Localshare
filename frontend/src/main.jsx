import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Registration from './Authentication/Registration.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import OtpCode from './OtpCode/OtpCode.jsx';
import GroupList from './Group/GroupList.jsx'
import GroupCreate from './Group/GroupCreate.jsx';
import ProfileCard from './components/ProfilCard/ProfilCard.jsx';
import Group from './Group/Group.jsx'
import File from './File/File.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },

  {
    path: "/otp-code/:email",
    element: <OtpCode />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/createGroup",
    element: <GroupCreate />,
  },
  {
    path: "/getUserByEmail",
    element: <ProfileCard />
  },
  {
    path: "/groups",
    element: <GroupList />
  },
  {
    path: "/group/:groupId",
    element: <Group />
  },
  {
    path: "/files",
    element: <File />
  }

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
