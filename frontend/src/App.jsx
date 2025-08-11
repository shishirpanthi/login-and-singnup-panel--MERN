import { useState } from "react";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import "./App.css";

function App() {
  const [panel, setPanel] = useState("signin");
  return (
    <div className="container">
      {panel === "signup" ? (
        <Signup onSwitch={setPanel} />
      ) : (
        <Signin onSwitch={setPanel} />
      )}
    </div>
  );
}

export default App;
