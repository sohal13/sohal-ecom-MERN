import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white p-8 ">
    <div className="container mx-auto flex flex-col md:flex-row text-center md:text-start gap-4 md:gap-0 md:justify-between max-w-[95%] ms-auto">
      <div>
        <h3 className="text-xl md:text-3xl font-bold mb-4">Quick Links</h3>
        <ul className='text-sm md:text-lg font-bold'>
          <li className="mb-2"><a href="#">Home</a></li>
          <li className="mb-2"><a href="#">Shop</a></li>
          <li className="mb-2"><a href="#">About Us</a></li>
          <li className="mb-2"><a href="#">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl md:text-3xl font-bold mb-4">Social Media</h3>
        <ul className='text-sm md:text-lg font-bold'>
          <li className="mb-2"><a href="#">Facebook</a></li>
          <li className="mb-2"><a href="#">Twitter</a></li>
          <li className="mb-2"><a href="#">Instagram</a></li>
        </ul>
      </div>
      <div className='text-sm md:text-lg font-bold'>
        <h3 className="text-xl md:text-3xl font-bold mb-4">Contact Us</h3>
        <p>123 Main Street, City</p>
        <p>Email: info@example.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
    </div>
    <div className="mt-8 text-center text-sm">
      <p>&copy; 2024 Your E-commerce Store. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer