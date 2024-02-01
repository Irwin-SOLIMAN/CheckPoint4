import { React, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import InscriptionModal from "../components/InscriptionModal";

function Connexion() {
  const [inscriptionModal, setInscriptionModal] = useState(false);

  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useOutletContext();

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!newUser.email.includes("@")) {
      setErrorMessage("Veuillez fournir une adresse Email valide");
    }

    if (!newUser.email || !newUser.password) {
      setErrorMessage("Veuillez remplir tous les champs");
    }

    try {
      // Envoie vers back pour connexion du user

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { email: newUser.email, password: newUser.password }
      );

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);

      navigate("/todolist");

      // on récupère et stock les infos de l'utilisateur + le token qu'on stock en local storage :
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="connexion">
      {errorMessage !== "" && (
        <div className="message">
          <p className="error">{errorMessage}</p>
        </div>
      )}
      <fieldset className="formulaire">
        <legend>Connexion</legend>
        <div className="connexionForm">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Email Adress"
            />
            <input
              type="password"
              name="password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Password"
            />
            <input type="submit" />
          </form>
        </div>
        <div className="inscriptionMessage">
          <p>Pas de compte ? </p>
          <button
            type="button"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => setInscriptionModal(!inscriptionModal)}
            style={{ textDecoration: "underline" }}
          >
            Inscription
          </button>
        </div>
      </fieldset>
      {inscriptionModal && (
        <InscriptionModal
          setInscriptionModal={setInscriptionModal}
          inscriptionModal={inscriptionModal}
        />
      )}
    </div>
  );
}

export default Connexion;
