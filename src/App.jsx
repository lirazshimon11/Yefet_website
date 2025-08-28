import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  // הערה קטנה: בוצע עדכון קטן 2025-08-28
  const { pathname } = useLocation()
  React.useEffect(()=>{ window.scrollTo({top:0, behavior:'smooth'}) }, [pathname])

  return (
    <div dir="rtl" lang="he" className="min-h-dvh flex flex-col text-slate-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
