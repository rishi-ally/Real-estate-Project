import { BrowserRouter as Router, Routes, Route ,useLocation} from "react-router-dom";
import Home from "../components/Home";
import Viewdetails from "../components/Viewdetails";
import Navbar from "../components/Navbar";
import Register from "../components/Register"
import Login from "../components/Login"
import Profile from "../components/Profile";
import Page2 from "../components/Page2";
import Hostprofile from "../components/Hostprofile";
import AddHome from "../components/AddHome";
import HouseListings from "../components/HouseListings";
import Favourites from "../components/Favourites";
import Edithouse from "../components/Edithouse";
import HomeLoans from "../components/HomeLoans";
import QueryPage from "../components/QueryPage";
import Userquery from "../components/Userquery";
import Displayhomes from "../components/Displayhomes";
function App() {
  const location=useLocation();
  return (
<>

{!(location?.pathname === "/register" || location?.pathname === "/register/page2") && <Navbar />}
      <Routes>
       
        <Route path="/house-info" element={<Viewdetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/register/page2" element={<Page2></Page2>}></Route>
        <Route path="/hostprofile" element={<Hostprofile></Hostprofile>}></Route>
        <Route path="/addhome" element={<AddHome></AddHome>}></Route>
        <Route path="/userhomes" element={<HouseListings></HouseListings>}></Route>
        <Route path="/favourites" element={<Favourites></Favourites>}></Route>
        <Route path="/edit-house/:id" element={<Edithouse></Edithouse>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/homeloans" element={<HomeLoans></HomeLoans>}></Route>
        <Route path="/queryfor/:houseId" element={<QueryPage></QueryPage>}></Route>
        <Route path="/fetchquery" element={<Userquery></Userquery>}></Route>
        <Route path="/search" element={<Displayhomes></Displayhomes>}></Route>
      </Routes>
     
    </>
  );
}

export default App;

