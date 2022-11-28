import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminSignin from "./components/AdminSigin";
import VendorSignin from "./components/VendorSignin";
import VendorSignup from "./components/VendorSignup";
import AdminHome from "./components/AdminHome";
import AdminRemoveFlights from "./components/AdminRemoveFlights";
import UserAllFlights from "./components/UserAllFlights"
import AdminAddFlight from "./components/AdminAddFlight";
import { ConfirmProvider } from 'material-ui-confirm';
import UserHome from "./components/UserHome";
import AdminAllFlights from "./components/AdminAllFlights";
import UserBookedFlights from "./components/UserBookedFlights";

function App() {
  return (
    <ConfirmProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/vendor/signin" exact element={<VendorSignin />} />
          <Route path="/vendor/signup" exact element={<VendorSignup />} />
          <Route path="/admin/home" exact element={<AdminHome />} />
          <Route path="/user/userhome" exact element={<UserHome />} />
          <Route path="/admin/signin" exact element={<AdminSignin />} />
          <Route path="/admin/addFlight" exact element={<AdminAddFlight />} />
          <Route path="/admin/removeFlights" exact element={<AdminRemoveFlights />} />
          <Route path="/admin/allFlights" exact element={<AdminAllFlights />} />
          <Route path="/user/allFlights" exact element={<UserAllFlights />} />
          <Route path="/user/userBookedFlights" exact element={<UserBookedFlights />} />
        </Routes>
      </div>
    </Router>
    </ConfirmProvider>
  );
}

export default App;
