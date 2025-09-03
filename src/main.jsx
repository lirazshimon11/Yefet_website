import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Pressure_ulcers from './pages/פצעי-לחץ.jsx'
import Diabetes from './pages/סוכרת.jsx'
import Blood_pressure from './pages/לחץ-דם.jsx'
import Nausea from './pages/בחילות.jsx'
import High_cholesterol from './pages/כולסטרול-גבוה.jsx'
import Migraine from './pages/מיגרנה.jsx'

import Reviews from './pages/Reviews.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/פצעי-לחץ', element: <Pressure_ulcers /> },
      { path: '/סוכרת', element: <Diabetes /> },
      { path: '/לחץ-דם', element: <Blood_pressure /> },
      { path: '/בחילות', element: <Nausea /> },
      { path: '/כולסטרול-גבוה', element: <High_cholesterol /> },
      { path: '/מיגרנה', element: <Migraine /> },
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
