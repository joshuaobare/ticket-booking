import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import CreateEvent from "./components/CreateEvent";
import FullEvent from "./components/FullEvent";
import SignUp from "./components/SignUp"
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);  

  return (
    <div className="App">     
      
      <BrowserRouter basename="/">
      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
        <Routes>
          <Route
            path="/"
            exact
            element={<UserHome loggedIn={loggedIn} />}
          />
          <Route path="/event/:id" exact element={<FullEvent loggedIn={loggedIn} />} />
          <Route path="/login" exact element = {<Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />}/>
          <Route path="/signup" exact element = {<SignUp />}/>
          <Route path="/profile/:id" exact element = {<Profile loggedIn={loggedIn}/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
