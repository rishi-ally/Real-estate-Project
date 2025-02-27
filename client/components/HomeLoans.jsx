import React from "react";
import Footer from "./Footer";

const HomeLoans = () => {
  const loanOptions = [
    {
      title: "Fixed-Rate Home Loan",
      description:
        "Enjoy consistent monthly payments with fixed interest rates throughout the loan tenure. Ideal for those who prefer predictable budgeting.",
      image:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    },
    {
      title: "Adjustable-Rate Home Loan",
      description:
        "Lower initial interest rates with periodic adjustments based on market trends. Suitable for short-term homeowners or those expecting income growth.",
      image:
        "https://images.pexels.com/photos/259597/pexels-photo-259597.jpeg",
    },
    {
      title: "Interest-Only Home Loan",
      description:
        "Pay only interest for the first few years, lowering initial monthly payments. Perfect for investors or buyers who plan to refinance later.",
      image:
        "https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg",
    },
    {
      title: "FHA Loan",
      description:
        "A government-backed loan with lower down payment requirements. Designed for first-time homebuyers with moderate credit scores.",
      image:
        "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
    },
    {
      title: "VA Loan",
      description:
        "Exclusively for veterans and active military members, offering zero down payment and competitive interest rates.",
      image:
        "https://images.pexels.com/photos/37347/house-car-garage-driveway.jpg",
    },
    {
      title: "Jumbo Loan",
      description:
        "For luxury homes exceeding conventional loan limits. Offers flexible terms for high-value properties.",
      image:
        "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg",
    },
  ];
  
  return (
    <>
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 p-6 mt-[8vh]">
      {/* Header Section */}
      <header className="text-center py-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl shadow-xl mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">Home Loans Made Easy</h1>
        <p className="text-lg text-white/80">
          Find the best home loan plans with low interest rates and flexible repayment
          options.
        </p>
      </header>

      {/* Loan Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Low Interest Rates</h3>
          <p className="text-gray-600">Get access to competitive interest rates starting at just 7.5%.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Flexible Tenure</h3>
          <p className="text-gray-600">Choose repayment terms that suit you, up to 30 years.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Quick Approvals</h3>
          <p className="text-gray-600">Fast and hassle-free approvals with minimal documentation.</p>
        </div>
      </section>

      {/* Loan Eligibility Section */}
      <div className="w-full max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Explore Home Loan Options
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loanOptions.map((loan, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={loan.image}
              alt={loan.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {loan.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {loan.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Process Section */}
      <div className="mt-16 bg-blue-50 p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          How to Apply for a Home Loan
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-4 leading-relaxed">
          <li>
            <strong>Research Loan Options:</strong> Understand different loan types
            and choose one that suits your needs.
          </li>
          <li>
            <strong>Check Eligibility:</strong> Review eligibility criteria such as
            income, credit score, and employment history.
          </li>
          <li>
            <strong>Prepare Documentation:</strong> Gather essential documents like
            ID proof, income statements, and property details.
          </li>
          <li>
            <strong>Apply Online or Visit a Lender:</strong> Submit your application
            through an online portal or directly at the lender’s branch.
          </li>
          <li>
            <strong>Loan Processing & Verification:</strong> The lender will verify
            your documents and assess your repayment capacity.
          </li>
          <li>
            <strong>Loan Approval & Disbursement:</strong> Once approved, the loan
            amount will be disbursed as per the agreed terms.
          </li>
        </ol>
      </div>
      <section className=" h-[50vh] relative bg-gray-800 text-white py-20 px-6 rounded-3xl overflow-hidden shadow-lg">
      <img
        src="https://media.istockphoto.com/id/961081044/photo/house-key-in-real-estate-sale-person-or-home-insurance-broker-agents-hand-giving-to-buyer.jpg?s=1024x1024&w=is&k=20&c=r7NhpM7Z9PY3wywhAKeBCiudAG_qWUBamf773rdml7M="
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Find Your <span className="text-blue-300">Dream Home</span>
        </h1>
        <p className="text-lg text-gray-300">
          Explore the best properties in your preferred location. Your perfect home
          is just a click away.
        </p>
        <a
          to="/addhome"
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
        >
          Add Your Listing
        </a>
      </div>
    </section>
      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">Why Choose Us?</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>No hidden charges</li>
            <li>Prepayment and part-payment options available</li>
            <li>Dedicated relationship managers</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-3">FAQs</h3>
          <p className="text-gray-600 mb-2">Q: How long does the approval process take?</p>
          <p className="text-gray-500">A: Typically, approvals are processed within 48 hours.</p>
          <p className="text-gray-600 mb-2 mt-4">Q: Are there any prepayment charges?</p>
          <p className="text-gray-500">A: No, we do not charge any fees for prepayment.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="text-center bg-indigo-600 py-10 rounded-3xl shadow-lg">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to own your dream home?</h2>
        <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-2xl shadow-md hover:bg-gray-100">
          Apply for a Loan Now
        </button>
      </footer>
    </div>
    <Footer></Footer>
    </>
  );
};

export default HomeLoans
