import React, { useState} from "react";
import "../styles/MainPage.css";
import SignIn from "./SignIn";
import Forum from "./Forum";
import ProfilePage from "./ProfilePage";
import AdminPanel from "./AdminPanel";
import {Link} from "react-router-dom"

function MainPage({ history }) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  
  function login(currentUser) {
    setConnected(true);
    setCurrentUser(currentUser);
    history.push("/forum"); // Redirection vers la page du forum après connexion réussie
  }

  function logout() {
    setConnected(false);
  }
  function handleClick(){
    window.location.reload();
  }
  return (
    <>
      
      {!isConnected ? (
        <div className="choix">
          <h1>Bienvenue sur OrganizAsso ! </h1>
          <h2>Le site qui vous permet d'échanger avec votre asso'</h2>  
          <div className="options">
          <p>Pour vous connecter, c'est par ici :</p>
          <Link to="/login"  >Se connecter</Link>

          <p>Et pour vous inscrire, c'est par là :</p>
          <Link to="/signin" >S'inscrire </Link>
          </div>
        </div>
      ):(

      
        <div className="main-page">
          {isAdmin && <AdminPanel />}
          <Forum
            isAdmin={isAdmin}
            logout={logout}
            isConnected={isConnected}
            currentUser={currentUser}
            history={history}
          />
          <ProfilePage history={history}/> {/* Afficher le composant ProfilePage si l'utilisateur est connecté */}
        </div>
      
      
      
  
          
      )} 
    </>
  );
}

export default MainPage;
