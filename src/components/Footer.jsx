import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer(){
  return (
    <footer className="mt-10 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} המרפאה הטבעית של יפת. כל הזכויות שמורות.</p>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/story" className="hover:text-emerald-700">על יפת</Link>
          <Link to="/knowledge" className="hover:text-emerald-700">מאמרים</Link>
          <Link to="/contact" className="hover:text-emerald-700">צור קשר</Link>
        </div>
      </div>
    </footer>
  )
}
