import Navbar from "../components/Navbar";
import Displayhomes from "./Displayhomes";
import Hero from "./Hero";
import Hero2 from "./Hero2";
import Footer from "./Footer"
const Home = () => {
  return (
    <div>
      <Navbar />
    <Hero></Hero>
     
<Displayhomes></Displayhomes>
      <Hero2></Hero2>
      <Footer></Footer>
    </div>
  );
};

export default Home;
