import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';

function MessageUser({ currentUser }) {
    
    axios.defaults.baseURL = 'http://localhost:4000';
    const [messages, setMessages] = useState([]);

    const [userMessages, setUserMessages] = useState([]);
    console.log(currentUser.login);

    useEffect(() => {
        // Charger les messages de l'utilisateur depuis l'API
        axios.get(`/api/messages/user/${currentUser.login}`)
            .then(response => {
                setUserMessages(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des messages de l\'utilisateur :', error);
            });
    }, [currentUser.id]);

    function handleDeleteMessage(messageId) {
        setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    }
    return (
        <div>
            <h3>Vos messages</h3>
            {userMessages.map(message => (
                <Message key={message._id} ident={message._id}
                            author={message.author}
                            content={message.content}
                            date={message.date}
                            replies={message.repliesID}
                            topic={message.topic}
                            onDeleteMessage={handleDeleteMessage} />
            ))}
        </div>
    );
}

export default MessageUser;
