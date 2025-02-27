import React from 'react'

const Footer = () => {
  return (
<>
<div className="bg-blue-600 text-white py-12">
<h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-6 text-center">
  <div>
    <h3 className="text-xl font-semibold">Verified Listings</h3>
    <p className="mt-2">All properties are verified and genuine.</p>
  </div>
  <div>
    <h3 className="text-xl font-semibold">Best Prices</h3>
    <p className="mt-2">We offer competitive pricing.</p>
  </div>
  <div>
    <h3 className="text-xl font-semibold">24/7 Support</h3>
    <p className="mt-2">We are always available for your queries.</p>
  </div>
</div>
</div>

<footer className="bg-gray-900 text-white py-6 text-center">
<p>© 2025 RealEstate. All rights reserved.</p>
</footer>
</>
  )
}

export default Footer