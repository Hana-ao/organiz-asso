import React, { useState } from 'react';
import '../styles/Message.css';
import DeleteMessage from './DeleteMessage';
import ReplyMessage from './ReplyMessage'; // Ajout du composant de réponse

function Message({ ident, author, content, date, onDeleteMessage, replies }) {
    const [showReplyForm, setShowReplyForm] = useState(false); // État pour afficher/cacher le formulaire de réponse

    const handleToggleReplyForm = () => {
        setShowReplyForm(!showReplyForm); // Inverser l'état actuel
    };

    const handleDeleteMessage = () => {
        onDeleteMessage(ident); // Passer l'identifiant du message à supprimer
    };

    return (
        <li className='message-item'>
            <p>Le {date} : {author} a écrit "{content}" </p>

            {/* Affichage des réponses */}
            {replies && replies.length > 0 && (
                <ul>
                    {replies.map((reply, index) => (
                        <li key={index}>
                            <p>{reply.content}</p>
                            <p>Réponse de {reply.author}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Bouton pour afficher/cacher le formulaire de réponse */}
            <button onClick={handleToggleReplyForm}>Répondre</button>

            {/* Affichage conditionnel du formulaire de réponse */}
            {showReplyForm && <ReplyMessage messageId={ident} currentUser={author}vb/>}

            <DeleteMessage onDelete={handleDeleteMessage} messageId={ident} />
            
        </li>
    );
}

export default Message;
