import React from 'react';

const Hero2 = () => {
  return (
    <>
      <section id="listings" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Upcoming Projects in Mumbai</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Project 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://assets.nobroker.in/media/building/8a9f92828824048d0188241ec0330eb1/images/8a9f92828824048d0188241ec0330eb1_project_image_6HF4WGiFLn1684235508686_7382_iris_medium.jpg"
                alt="Project Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Project A - Luxury Living in Andheri</h3>
                <p className="text-gray-700 mt-2">State-of-the-art amenities in the heart of Andheri. Ready by 2025.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">₹80,00,000</span>
                  <a href="#" className="text-blue-600 hover:underline">View Details</a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://marathon.in/wp-content/uploads/2022/11/sw.jpg"
                alt="Project Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Project B - High-rise in Worli</h3>
                <p className="text-gray-700 mt-2">Modern amenities with spectacular sea views. Launching soon.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">₹1,20,00,000</span>
                  <a href="#" className="text-blue-600 hover:underline">View Details</a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://www.southernmoverspackers.com/wp-content/uploads/2022/06/12-Incredible-Mega-Projects-That-will-Change-The-Identity-of-Thane-City.webp"
                alt="Project Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Project C - Residential Towers in Thane</h3>
                <p className="text-gray-700 mt-2">Affordable luxury with easy access to highways. Ready by 2026.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">₹55,00,000</span>
                  <a href="#" className="text-blue-600 hover:underline">View Details</a>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://img.theweek.in/content/dam/week/magazine/theweek/specials/images/2023/1/28/56-An-aerial-view-of-the-project-site-at-Haji-Ali-Dargah.jpg.image.490.286.jpg"
                alt="Project Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Project D - Penthouses in South Mumbai</h3>
                <p className="text-gray-700 mt-2">Exclusive penthouses with panoramic city views. Coming in 2024.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">₹3,50,00,000</span>
                  <a href="#" className="text-blue-600 hover:underline">View Details</a>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://www.floortap.com/_next/image?url=https%3A%2F%2Fcreleasing-images.s3.ap-south-1.amazonaws.com%2Fraw%2Fprojects%2F2%2F53e2e1f1-ded5-4f9f-b60a-01774a1a1d1d.jpeg&w=2048&q=75"
                alt="Project Image"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Project E - Commercial Spaces in BKC</h3>
                <p className="text-gray-700 mt-2">State-of-the-art office spaces with prime location benefits. Pre-launch offer.</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">₹2,00,00,000</span>
                  <a href="#" className="text-blue-600 hover:underline">View Details</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero2;
