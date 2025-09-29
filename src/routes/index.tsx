import { createBrowserRouter } from 'react-router-dom'
import Alerts from '../pages/Alerts'
import BatchHistory from '../pages/BatchHistory'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import AppLayout from '../layouts/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    //   {
    //     path: 'dashboard',
    //     element: <Dashboard />,
    //   },
    //   {
    //     path: 'batch-history',
    //     element: <BatchHistory />,
    //   },
    //   {
    //     path: 'alerts',
    //     element: <Alerts />,
    //   },
    ],
  },
])
