import React from 'react';
import axios from 'axios';

function DeleteMessage({onDelete, messageId }) {
    const handleDelete = async () => {
        try {
            // Envoyer une requête DELETE à l'API pour supprimer le message avec l'ID spécifié
            const response = await axios.delete(`/api/message/${messageId}`);
            if (response.status === 204) {
                // Si la suppression est réussie, appeler la fonction onDelete
                onDelete();
                console.log('message supprimé');
            } else {
                throw new Error('Échec de la suppression du message');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du message :', error);
        }
    };
    

    return (
        <button onClick={handleDelete}>Supprimer</button>
    );
}

export default DeleteMessage;
