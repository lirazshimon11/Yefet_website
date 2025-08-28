import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Story from './pages/Story.jsx'
import Knowledge from './pages/Knowledge.jsx'
import Reviews from './pages/Reviews.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/story', element: <Story /> },
      { path: '/knowledge', element: <Knowledge /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/contact', element: <Contact /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
