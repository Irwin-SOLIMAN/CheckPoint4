import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { setUser } = useOutletContext();

  const navigate = useNavigate();

  async function getbytoken() {
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
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getbytoken();
  }, []);

  if (!localStorage.getItem("token")) return null;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
