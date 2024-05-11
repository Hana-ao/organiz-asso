import React, { useState } from 'react';
import '../styles/MessageForm.css';
import axios from 'axios';
import {BrowserRouter, Link} from "react-router-dom";

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
            author: currentUser.login,
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
            <BrowserRouter forceRefresh ={true}>

            <form onSubmit={handleSubmit}>
                <label>Topic </label>
                <input
                    type='text'
                    value={topic}
                    onChange={handleTopicChange}
                />
                <label>Ajouter un nouveau message </label>
                <input
                    type='text'
                    value={messageContent}
                    onChange={handleMessageChange}
                />
                
                <button type='submit'>Envoyer</button>
            </form>
            </BrowserRouter>
        </div>
    );
}


export default MessageForm;
