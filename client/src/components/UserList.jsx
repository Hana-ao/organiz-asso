import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/UserList.css';

function UserListItem({ user, onGrantAdmin, onRevokeAdmin }) {
    return (
        <div className="user-item">
            <p>Utilisateur n° <strong>{user._id}</strong></p>
            <p>Identifiant: <strong>{user.login}</strong></p> 
            <button onClick={() => onGrantAdmin(user._id)}>Accorder statut ADMIN</button>
            <button onClick={() => onRevokeAdmin(user._id)}>Révoquer statut ADMIN</button>
        </div>
    );
}

function UserList({ currentUser, onGrantAdmin, onRevokeAdmin }) {
    const [usersList, setUsersList] = useState([]);
    const [folded, setFolded] = useState(false);

    useEffect(() => {
        axios.get(`api/users`)
        .then(response => {
            setUsersList(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
        });
    }, []);

    const filteredUsers = usersList.filter(user => user._id !== currentUser._id);

    function toggleFold() {
        setFolded(!folded);
    }

    return (
        <div className="user-list">
            <h2>Liste des utilisateurs inscrits</h2>
            <button onClick={toggleFold}>{folded ? "Afficher la liste" : "Cacher la liste"}</button>
            {!folded && (
                <div className="user-items">
                    {filteredUsers.map(user => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            onGrantAdmin={onGrantAdmin}
                            onRevokeAdmin={onRevokeAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserList;