import React, { useState } from 'react';
import '../styles/MessageForm.css';
import axios from 'axios';

function MessageForm({ onMessageSubmit, currentUser }) {
    const [messageContent, setMessageContent] = useState('');
    const [topic, setTopic] = useState('');

    function handleMessageChange(event) {
        setMessageContent(event.target.value);
    }

    function handleTopicChange(event) {
        setTopic(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const currentDate = new Date();
        const stringifiedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} à ${currentDate.getHours()}:${currentDate.getMinutes()}`;

        const messageData = {
            author: currentUser,
            content: messageContent,
            date: stringifiedDate,
            topic: topic, // Ajout du topic
        };

        axios.post('/api/message', messageData)
            .then(response => {
                const data = response.data;
                console.log('ID du message créé :', data.id);
                onMessageSubmit(data);
                setMessageContent('');
                setTopic(''); // Réinitialiser le champ du topic après soumission
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi du message :', error);
            });
    }

    return (
        <div className='message-form'>
            <form onSubmit={handleSubmit}>
                <label>Ajouter un nouveau message</label>
                <input
                    type='text'
                    value={messageContent}
                    onChange={handleMessageChange}
                />
                <label>Topic</label>
                <input
                    type='text'
                    value={topic}
                    onChange={handleTopicChange}
                />
                <button type='submit'>Envoyer</button>
            </form>
        </div>
    );
}


export default MessageForm;
