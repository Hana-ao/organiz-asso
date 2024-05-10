import '../styles/MessageList.css';
import { useState, useEffect } from 'react';
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
        //Pour éviter d'avoir à actualiser après chaque changement, on utilise useEffect
  
        window.location.reload(); //permet de recharger la page
 
    }

    // Fonction pour supprimer un message de la liste
    function handleDeleteMessage(messageId) {
        setMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    }

    return (
        <div className='message-list'>
            <h1>Liste des messages</h1>
            {/* Afficher le formulaire pour ajouter un nouveau message */}
            <MessageForm onMessageSubmit={handleMessageSubmit} currentUser={currentUser} />
            <ul>
                {/* Afficher la liste des messages */}
                {messages.map(message => (
                    <Message
                        key={message._id}
                        ident={message._id}
                        author={message.author}
                        content={message.content}
                        date={message.date}
                        replies={message.replies}
                        onDeleteMessage={handleDeleteMessage} // Passer la fonction de suppression
                    />
                ))}
            </ul>
        </div>
    );
}

export default MessageList;
