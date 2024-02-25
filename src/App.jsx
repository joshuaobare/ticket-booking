import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  return <Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>;
}

export default App;
