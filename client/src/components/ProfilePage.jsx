import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from "./User";
import '../styles/ProfilePage.css';
import MessageUser from "./MessageUser";
import {BrowserRouter, Link} from "react-router-dom";


function ProfilePage({ history, location }) {
    const { currentUser } = location.state || {};
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Pour stocker les informations de l'utilisateur sélectionné

    useEffect(() => {
        // Charger la liste de tous les utilisateurs depuis l'API
        axios.get("/api/users")
            .then(response => {
                setAllUsers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des utilisateurs :', error);
            });
    }, []);

    function handleClick() {
        history.push({
            pathname: "/forum",
            state: { currentUser: currentUser }
        });
    }

    // Gestionnaire d'événements pour afficher les informations détaillées de l'utilisateur sélectionné
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="profile-page-box">
        <BrowserRouter forceRefresh ={true}>

            <h2>Bienvenue sur la page de profil</h2>
            <User {...currentUser} />
            <h3>Liste des utilisateurs inscrits :</h3>
            <ul>
                {allUsers.map(user => (
                    <li key={user._id}>
                        <button onClick={() => handleUserClick(user)}>
                            {user.name} {user.lastName}
                        </button>
                    </li>
                ))}
            </ul>
            {/* Affichage des informations détaillées de l'utilisateur sélectionné */}
            {selectedUser && (
                <div>
                    <h3>Informations sur l'utilisateur :</h3>
                    <p>Prénom : {selectedUser.name}</p>
                    <p>Nom : {selectedUser.lastName}</p>
                    <p>Identifiant : {selectedUser.login}</p>
                    <p>E-mail : {selectedUser.email}</p>
                    <p>Statut : {selectedUser.isAdmin ? "Administrateur" : "Utilisateur standard"}</p>
                </div>
            )}
            <MessageUser currentUser={currentUser} />
            <button onClick={handleClick}>Forum</button>
        </BrowserRouter>
        </div>
    );
}

export default ProfilePage;
