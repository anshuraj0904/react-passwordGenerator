import { useState } from 'react'
import './App.css'
import PasswordGenerator from './PasswordGenerator.jsx'
function App() {

  return (
      <div className="flex flex-col items-center  text-white min-h-screen bg-gray-800">
         <PasswordGenerator />
      </div>
  )
}

export default App
