import React from 'react'

function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">We'd love to hear from you! You can contact us using the information below:</p>
      <div className="flex flex-col md:flex-row">
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-2">Address</h2>
          <p>123 Main St</p>
          <p>Anytown, USA 12345</p>
        </div>
        <div className="md:ml-8 flex-grow">
          <h2 className="text-xl font-bold mb-2">Phone</h2>
          <p>(123) 456-7890</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Email</h2>
        <p>info@example.com</p>
      </div>
    </div>
  )
}

export default Contact
