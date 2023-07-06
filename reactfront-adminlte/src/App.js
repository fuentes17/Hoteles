import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ShowHotel from "./Components/ShowHotel";
import CreateHotel from "./Components/CreateHotel";
import UpdateHotel from "./Components/UpdateHotel";
import Aside from "./Components/Aside";
import Header from "./Components/Header";
import Footer from "./Components/Footers";


function App() {
  return (
    <div>
      <Aside />
      <Header />
     
        <div className="app">
          <BrowserRouter>
            <Routes>
              
              <Route path="/" element={<ShowHotel />} />
            </Routes>
          </BrowserRouter>
       
      </div>
      <Footer />
    </div>
  );
}

export default App;
