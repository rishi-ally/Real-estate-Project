function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center flex items-center mt-[5rem] h-[30rem] justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="w-full max-w-[50rem] p-6 rounded-lg"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Get Your Dream Home Today
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mt-2">
            Apply for a home loan with the best interest rates. Your future home is closer than you think!
          </p>
          <a
            href="/homeloans"
            className="mt-4 px-6 py-2 bg-green-500 text-grey rounded-lg hover:bg-green-300"
          >
            See Home loans
          </a>
        </div>
      </div>
    </>
  );
}

export default Hero;
