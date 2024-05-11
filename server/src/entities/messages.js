const {ObjectId} = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db;
        const { ObjectId } = require('mongodb');

    }

    // Fonction pour afficher un message
    async getMessage(messageId) {
        console.log(messageId);
    
        try {
            const message = await this.db.collection('messages').findOne({ _id: new ObjectId(messageId) });
            console.log('Message récupéré avec succès :', message);
            return message;
        } catch (error) {
            console.error("Erreur lors de la récupération du message :", error);
            throw new Error("Erreur lors de la récupération du message : " + error.message);
        }
    }
    async getMessagesByReplyIds(replyIds) {
        try {
            const messagePromises = replyIds.map(async (replyId) => {
                return await this.getMessage(replyId);
            });
            
            // Attendre la résolution de toutes les promesses pour obtenir les messages correspondants
            const messages = await Promise.all(messagePromises);
            
            return messages;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des messages : " + error.message);
        }
    }
    
    
    // Fonction pour récupérer tous les messages
    async getAllMessages() {
        try {
            const messages = await this.db.collection('messages').find().toArray();
            return messages ; // Retourne la liste de tous les messages
        } catch (error) {
            throw new Error("Erreur lors de la récupération de la liste des messages : " + error.message);
        }
    }
    // Fonction pour créer un nouveau message
    // Dans la classe Messages

    async createMessage(messageData) {
        try {
            if (messageData.parentId) {
                console.log(messageData.parentId);
                // Si parentId est fourni, il s'agit d'une réponse à un message parent
               
                    // Insérer la réponse dans la base de données
                    const result = await this.db.collection("messages").insertOne(messageData);
                    console.log(result);
                    const insertedId = result.insertedId;
                    
                    // Mettre à jour la liste des réponses du parent avec l'ID de la nouvelle réponse
                    await this.db.collection("messages").updateOne(
                        { _id: new ObjectId(messageData.parentId) },
                        { $push: { repliesID: insertedId } }
                    );
                    
                    console.log("Réponse créée avec succès !");
                
            } else {
                // Sinon, créez un nouveau message comme d'habitude
                const newMessage = {
                    author: messageData.author,
                    content: messageData.content,
                    date: messageData.date,
                    parentId: null,
                    repliesID: [],
                    topic: messageData.topic,
                };
    
                // Insérer le nouveau message dans la base de données
                const result = await this.db.collection("messages").insertOne(newMessage);
                const insertedId = result.insertedId;
    
                if (insertedId) {
                    console.log("ID généré :", insertedId);
                    return insertedId;
                } else {
                    throw new Error("ID généré non trouvé");
                }
            }
        } catch (error) {
            throw new Error('Erreur lors de la création du message : ' + error.message);
        }
    }
    

    // Fonction pour supprimer un message
    async deleteMessage(messageId) {
        const ObjectId = require('mongodb').ObjectId;
    
        try {
            // Récupérer le parentID du message
            const message = await this.db.collection("messages").findOne({ _id: new ObjectId(messageId) });
    
            // Si le message a un parentID, supprimer l'ID du message de la liste des réponses du parent
            if (message && message.parentId) {
                await this.db.collection("messages").updateOne(
                    { _id: new ObjectId(message.parentId) },
                    { $pull: { repliesID: new ObjectId(messageId) } }
                );
            }
    
            // Supprimer le message de la collection messages
            const result = await this.db.collection("messages").deleteOne({ _id: new ObjectId(messageId) });
            if (result.deletedCount === 0) {
                throw new Error("Le message à supprimer n'a pas été trouvé.");
            }
    
            console.log('La suppression du message est terminée.');
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    }
    
  
    
    
    // Utilisation de la fonction pour supprimer un message
    
    async searchMessages(searchTerm, startDate, endDate, author) {
        console.log('Bienvenue sur la fonction de recherche');
        try {
            let query = {};
            
            // Ajouter la recherche par mots-clés
            if (searchTerm) {
                console.log('Vous avez recherché par mot-clé');
                query.content = { $regex: searchTerm, $options: "i" }; // Recherche insensible à la casse
            }
    
            // Ajouter la recherche par intervalle de temps
            if (startDate && endDate) {
                console.log('Vous avez recherché par date');
                query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
            }
    
            // Ajouter la recherche par auteur
            if (author) {
                console.log('Vous avez recherché par auteur');
                query.author = author;
            }
    
            console.log(query);
            const searchResults = await this.db.collection('messages').find(query).toArray();
    
            return searchResults; // Renvoyer tous les résultats de la recherche
        } catch (error) {
            throw new Error("Erreur lors de la recherche des messages : " + error.message);
        }
    }

    // Dans la classe Messages

async replyToMessage(messageId, replyContent, author, parentId) {
    try {
        const reply = {
            author: author,
            content: replyContent,
            date: new Date(),
            parentId: parentId // Ajouter le parentId à la réponse
        };

        await this.db.collection('messages').updateOne(
            { _id: new ObjectId(messageId) },
            { $push: { replies: reply } }
        );
    } catch (error) {
        throw new Error('Erreur lors de la réponse au message : ' + error.message);
    }
}
async getUserMessages(username) {
    try {
        const results = await this.db.collection('messages').find({ author: username }).toArray();
        return results;
    } catch (error) {
        throw new Error("Erreur lors de la recherche des messages : " + error.message);
    }
}



    
   

    
    
  }
  
 module.exports  = Messages;
  