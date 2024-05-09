import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminControls from "./AdminControls";
import AdminApprovalList from "./AdminApprovalList";
{/*import '../styles/AdminPanel.css';*/}


function AdminPanel() {


    
    // Exemple de données d'utilisateurs à approuver
    const [usersToApprove, setUsersToApprove] = useState([]);

    
   

    async function handleApproveUser(userId) {
        try {
            await axios.post(`api/request/${userId}/accept`);
            setUsersToApprove(prevUsers => prevUsers.filter(user => user._id !== userId));
            usersToApprove.forEach(user => {
                console.log("Affichage des logins " + user.login);
                
            })
        } catch {
            console.error("Erreur durant l'approbation de l'utilisateur");
        }
    }
    
    async function handleRejectUser(userId) {
        try {
            await axios.delete(`api/request/${userId}/reject`);
            setUsersToApprove(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch {
            console.error("Erreur lors du rejet de l'utilisateur");
        }
    };

    // Appel à fetchUsersToApprove pour mettre à jour la liste des demandes d'approbation
    async function fetchUsersToApprove() {
        try {
            const response = await axios.get(`api/requests`);
            if (Array.isArray(response.data)) {
                setUsersToApprove(response.data);
            } else {
                console.error("La réponse du serveur n'est pas dans le format attendu.");
            }
        } catch {
            console.error("Erreur durant la récupération des demandes d'inscription");
        }
    }

    // Fonction pour accorder les droits d'administration
    const handleGrantAdmin = () => {
        // Ajouter la logique pour accorder les droits d'administration dans votre application
    };

    // Fonction pour révoquer les droits d'administration
    const handleRevokeAdmin = () => {
        // Ajouter la logique pour révoquer les droits d'administration dans votre application
    };
    useEffect(() => {
        fetchUsersToApprove();
     },[])

    return (
        <div className='admin-panel'>
            {/* Contenu de votre panneau d'administration */}
            <h2>Panel d'administration</h2>
            {/* Ajoutez d'autres éléments et fonctionnalités ici */}
            <AdminApprovalList usersToApprove={usersToApprove} onApprove={handleApproveUser} onReject={handleRejectUser} />
            <AdminControls onGrantAdmin={handleGrantAdmin} onRevokeAdmin={handleRevokeAdmin} />

        </div>
    );
    
}

export default AdminPanel;
