import React, { useState, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import MessageForm from './MessageForm'; 

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

    // Fonction pour trier les messages par leur topic
    function sortMessagesByTopic(messages) {
        const sortedMessages = {};
        messages.forEach(message => {
            const { topic } = message;
            if (!sortedMessages[topic]) {
                sortedMessages[topic] = [];
            }
            sortedMessages[topic].push(message);
        });
        return sortedMessages;
    }

    // Trier les messages par topic
    const sortedMessages = sortMessagesByTopic(messages);

    return (
        <div className='message-list'>
            <h1>Liste des messages par topic</h1>
            {/* Afficher le formulaire pour ajouter un nouveau message */}
            <MessageForm onMessageSubmit={handleMessageSubmit} currentUser={currentUser} />
            {/* Afficher les messages par topic */}
            {Object.entries(sortedMessages).map(([topic, topicMessages]) => (
                <div key={topic}>
                    <h2>{topic}</h2>
                    <ul>
                        {topicMessages.map(message => (
                            <Message
                                key={message._id}
                                ident={message._id}
                                author={message.author}
                                content={message.content}
                                date={message.date}
                                replies={message.repliesID}
                                topic={message.topic}
                                onDeleteMessage={handleDeleteMessage}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
