import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {

  // const base_URL = "https://quotifyapi.onrender.com";
  // const base_URL = "https://lonely-suspenders-ray.cyclic.app";
  const base_URL = "http://localhost:5000";
  const [message, setMessage] = useState("");
  const updateMessage = (type, message) => {
    setMessage({ type, message });
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  //Check valid user using authtoken
  const verifyUser = async () => {
    try {
      const authToken = !localStorage.getItem('auth-token') ? "" : JSON.parse(localStorage.getItem('auth-token')).token;
      const response = await fetch(base_URL + "/quotifyAuthAPI/verifyUser/", {
        method: "GET",
        headers: { "Content-type": "application/json", "auth-token": authToken },
      })
      console.log(response);
      if (response.status !== 200)
        return false;
      const responseJson = await response.json();
      return responseJson;
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }

  return (
    <>
      <Router>
        <Navbar base_URL={base_URL} verifyUser={verifyUser} message={message} updateMessage={updateMessage} />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
