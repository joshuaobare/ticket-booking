import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login"
import UserHome from "./components/UserHome";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  return (
  <div>
    {/* <Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/> */}
    <UserHome />
    </div>);
}

export default App;
