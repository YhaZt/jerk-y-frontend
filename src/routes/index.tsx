import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import BatchHistory from '../pages/BatchHistory'
import Alerts from '../pages/Alerts'
import ProductTracker from '../pages/ProductTracker'
import ProductVerification from '../pages/ProductVerification'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'batch-history',
        element: <BatchHistory />
      },
      {
        path: 'alerts',
        element: <Alerts />
      },
      {
        path: 'product-tracker',
        element: <ProductTracker />
      },
      {
        path: 'verify/:productCode',
        element: <ProductVerification />
      }
    ]
  }
])