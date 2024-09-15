import { createBrowserRouter } from 'react-router-dom'
import {
  Home,
  Orders,
  Advertisements,
  AdvertisementDetails,
  NotFound,
} from './pages'
import { Layout } from './components'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/advertisements', element: <Advertisements /> },
      { path: '/orders', element: <Orders /> },
      { path: '/advertisements/:id', element: <AdvertisementDetails /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
