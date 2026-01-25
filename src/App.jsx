import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./components/Home/home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
