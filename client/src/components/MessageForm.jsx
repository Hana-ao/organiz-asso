import '../styles/MessageForm.css';
import { useState } from 'react';
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
            author: currentUser.login,
            content: messageContent,
            date: stringifiedDate,
        };

        // Appeler l'API pour créer un nouveau message
        axios.post('/api/message', messageData)
            .then(response => {
                // Mettre à jour la liste des messages après l'ajout du nouveau message
                onMessageSubmit(response.data);
                // Réinitialiser le champ du formulaire
                setMessageContent('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du message :', error);
            });
    }

    return (
        <div className='message-form'>
            <h2>Ajouter un nouveau message</h2>
            <form onSubmit={handleSubmit}>
                <label>Contenu du message</label>
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
