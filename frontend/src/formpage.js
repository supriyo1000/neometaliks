import React from 'react'
// import Navbar from './components/navbar'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Form from './form'

const Formpage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main id="main" class="main" style={{ marginLeft: "240px" }}>
        <Form />
      </main>
    </div>
  )
}

export default Formpage