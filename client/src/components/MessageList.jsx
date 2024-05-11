import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import MessageForm from './MessageForm'; 
import {BrowserRouter, Link} from "react-router-dom";


function MessageList({ currentUser }) {
    const [messages, setMessages] = useState([]);
    axios.defaults.baseURL = 'http://localhost:4000';
    
    useEffect(() => {
        // Charger les messages depuis l'API lorsque le composant est monté
        axios.get('/api/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des messages :', error);
            });
    }, []);

    // Fonction pour ajouter un nouveau message à la liste
    function handleMessageSubmit(newMessage) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }

    // Fonction pour supprimer un message de la liste
    function handleDeleteMessage(messageId) {
        setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    }

    // Filtrer les messages pour afficher uniquement ceux dont le parentId est null
    const rootMessages = messages.filter(message => message.parentId === null);
    
    return (
    <div className='message-list'>
        <BrowserRouter forceRefresh ={true}>

        <h1>Liste des messages par topic</h1>
        {/* Afficher le formulaire pour ajouter un nouveau message */}
        <MessageForm onMessageSubmit={handleMessageSubmit} currentUser={currentUser} />
        {/* Afficher les messages par topic */}
        {rootMessages.map(message => (
            <div key={message._id}>
                <h2>Topic - {message.topic}</h2>
                <ul>
                    <li key={message._id}>
                        <Message
                            ident={message._id}
                            author={message.author}
                            content={message.content}
                            date={message.date}
                            replies={message.repliesID}
                            topic={message.topic}
                            onDeleteMessage={handleDeleteMessage}
                            currentUser={currentUser}
                        />
                    </li>
                </ul>
            </div>
        ))}
    </BrowserRouter>
    </div>
);

}

export default MessageList;
