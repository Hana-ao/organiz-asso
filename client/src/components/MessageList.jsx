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

    return (
        <div className='message-list'>
            <h1>Liste des messages</h1>
            {/* Afficher le formulaire pour ajouter un nouveau message */}
            <MessageForm onMessageSubmit={handleMessageSubmit} currentUser={currentUser} />
            <ul>
                {/* Afficher la liste des messages */}
                {messages.map(message => (
                    <Message
                        key={message.id}
                        author={message.author}
                        content={message.content}
                        date={message.date}
                    />
                ))}
            </ul>
        </div>
    );
}


export default MessageList;
