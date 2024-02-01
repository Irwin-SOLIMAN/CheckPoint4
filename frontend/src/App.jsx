import { React, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});

  const location = useLocation();

  async function getByToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      );

      setUser(res.data);
    }
  }

  useEffect(() => {
    getByToken();
  }, [location.pathname]);

  return (
    <div className="App">
      <Outlet context={{ user, setUser }} />
    </div>
  );
}

export default App;
