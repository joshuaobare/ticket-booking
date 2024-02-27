import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import CreateEvent from "./components/CreateEvent";
import FullEvent from "./components/FullEvent";
import AdminHome from "./components/AdminHome";
import Navbar from "./components/Navbar";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="App">
      {/* <Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/> */}
      <Navbar />
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            exact
            element={isAdmin ? <AdminHome /> : <UserHome />}
          />
          <Route path="/event/:id" exact element={<FullEvent loggedIn={loggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
