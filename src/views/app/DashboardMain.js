import React from 'react'
import Dashboard from '../../components/dashboard/Dashboard'

function DashboardMain() {
  const LoginUserName =localStorage.getItem('LoginUserName')
  console.log("LoginUserName",LoginUserName)
  return (
    <>
      <Dashboard />
    </>
  )
}

export default DashboardMain
