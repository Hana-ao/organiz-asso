import React, { useState } from 'react';
import '../styles/MessageForm.css';
import axios from 'axios';

function MessageForm({ onMessageSubmit, currentUser }) {
    const [messageContent, setMessageContent] = useState('');

    // Fonction pour gérer le changement du contenu du message
    function handleMessageChange(event) {
        setMessageContent(event.target.value);
    }

    // Fonction pour soumettre le nouveau message
    function handleSubmit(event) {
        
        event.preventDefault();
        const currentDate = new Date();
        const stringifiedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} à ${currentDate.getHours()}:${currentDate.getMinutes()}`;

        // Créer l'objet message avec les données du formulaire
        const messageData = {
            author: currentUser,
            content: messageContent,
            date: stringifiedDate,
        };
        console.log (currentUser);
        // Appeler l'API pour créer un nouveau message
        axios.post('/api/message', messageData)
            .then(response => {
                const data = response.data;
                console.log('ID du message créé :', data.id);

                // Mettre à jour la liste des messages après l'ajout du nouveau message
                onMessageSubmit(data);
                // Réinitialiser le champ du formulaire
                setMessageContent('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du message :', error);
            });
    }

    return (
        <div className='message-form'>
            
            <form onSubmit={handleSubmit}>
                <label>Ajouter un nouveau message </label>
                <input
                    type='text'
                    value={messageContent}
                    onChange={handleMessageChange}
                />
                <button type='submit'>Envoyer</button>
            </form>
        </div>
    );
}

export default MessageForm;
