import React, { useState } from 'react';
import axios from 'axios';

function ReplyMessage({ messageId, currentUser }) {
    const [replyContent, setReplyContent] = useState('');

    function handleReplyChange(event) {
        setReplyContent(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const currentDate = new Date();
        const stringifiedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} à ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    
        const replyData = {
            author: currentUser,
            content: replyContent,
            date: stringifiedDate,
            parentId: messageId, // Utiliser l'ID du message auquel on répond
        };
        console.log(replyData.parentId);
        try {
            // Requête GET pour récupérer le message parent
            const response = await axios.get(`/api/message/${replyData.parentId}`);
            const parentTopic = response.data.topic;
            console.log('get appelé avec succes ');
            console.log(parentTopic);
            // Définir replyData2
            const replyData2 = {
                author: currentUser,
                content: replyContent,
                date: stringifiedDate,
                parentId: messageId,
                topic: parentTopic, // Utiliser le sujet du message parent
            };

            // Requête POST pour créer la réponse
            await axios.post('/api/message', replyData2);
            console.log('Réponse créée avec succès !');

            // Réinitialiser le champ du formulaire
            setReplyContent('');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la réponse :', error);
        }
    }

    return (
        <div className='reply-form'>
            <h3>Répondre au message</h3>
            <form onSubmit={handleSubmit}>
                <label>Contenu de la réponse</label>
                <input
                    type='text'
                    value={replyContent}
                    onChange={handleReplyChange}
                />
                <button type='submit'>Envoyer</button>
            </form>
        </div>
    );
}

export default ReplyMessage;
