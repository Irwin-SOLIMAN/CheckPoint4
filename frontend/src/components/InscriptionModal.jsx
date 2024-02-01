import { React, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from "axios";
import PropTypes from "prop-types";

function InscriptionModal({ setInscriptionModal, inscriptionModal }) {
  const [errorMessage, setErrorMessage] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { setUser } = useOutletContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!newUser.email.includes("@")) {
      setErrorMessage("Veuillez fournir une adresse Email valide");
    }

    if (!newUser.username || !newUser.email || !newUser.password) {
      setErrorMessage("Veuillez remplir tous les champs");
    } else {
      try {
        // Envoi vers back pour création du user
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user`,
          newUser
        );

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
  }

  return (
    <div className="inscription">
      <div className="inscriptionContainer">
        <fieldset className="formulaire">
          <legend>Inscription</legend>
          <div className="close">
            <button
              type="button"
              onClick={() => setInscriptionModal(!inscriptionModal)}
            >
              x
            </button>
          </div>
          {errorMessage !== "" && (
            <div className="message">
              <p className="error">{errorMessage}</p>
            </div>
          )}
          <div className="connexionForm">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Email Adress"
              />
              <input
                type="text"
                name="password"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Password"
              />
              <input type="submit" />
            </form>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

InscriptionModal.propTypes = {
  inscriptionModal: PropTypes.bool.isRequired,
  setInscriptionModal: PropTypes.func.isRequired,
};

export default InscriptionModal;
