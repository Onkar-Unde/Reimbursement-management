import { useState } from 'react'
import Sidebar from './components/sidebar'
import { AdminProvider } from './modules/admin/context/AdminContext'


function App() {
 
  return (
    <AdminProvider>
      <Sidebar />
    </AdminProvider>
  )
}

export default App
