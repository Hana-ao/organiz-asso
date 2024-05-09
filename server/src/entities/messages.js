const {ObjectId} = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db;
        const { ObjectId } = require('mongodb');

        // Suite à venir avec la base de données
    }

    // Fonction pour afficher un message
    getMessage(messageId) {
        
        return new Promise((resolve, reject) => {
            this.db.collection("messages").findOne({ _id: messageId }, (err, message) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(message);
                }
            });
        });
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
    createMessage(messageData) {
        console.log("createMEssae");
        return new Promise((resolve, reject) => {
            this.db.collection("messages").insertOne(messageData, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const insertedId = result.insertedId; // Récupérer l'ID généré
                    if (insertedId) {
                        console.log("ID généré :", insertedId);
                        resolve(insertedId); // Renvoyer l'ID généré
                    } else {
                        reject(new Error("ID généré non trouvé"));
                    }
                }
            });
        });
    }
    
    // Fonction pour supprimer un message
    deleteMessage(messageId) {
        // Import de ObjectId depuis le module mongodb

        return new Promise((resolve, reject) => {
            this.db.collection("messages").deleteOne({_id : new ObjectId(messageId)}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }).then(() => {
            console.log('La suppression du message est terminée.');
        }).catch(error => {
            console.error('Une erreur s\'est produite :', error);
        });
    }
    
    // Dans votre classe Messages

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
    }async searchMessages(searchTerm, startDate, endDate, author) {
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
                query.creationDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
            }
    
            // Ajouter la recherche par auteur
            if (author) {
                console.log('Vous avez recherché par auteur');
                query.owner = author;
            }
    
            console.log(query);
            const searchResults = await this.db.collection('messages').find(query).toArray();
            console.log(searchResults);
            return searchResults; // Renvoyer tous les résultats de la recherche
        } catch (error) {
            throw new Error("Erreur lors de la recherche des messages : " + error.message);
        }
    }

    async replyToMessage(messageId, replyContent, author) {
        try {
            await this.db.collection('messages').updateOne(
                { _id: new ObjectId(messageId) },
                { 
                    $push: { 
                        replies: { 
                            author: author,
                            content: replyContent, 
                            date: new Date() 
                        } 
                    } 
                }
            );
        } catch (error) {
            throw new Error('Erreur lors de la réponse au message : ' + error.message);
        }
    }
    
   

    
    // Autres méthodes à ajouter selon les besoins
  }
  
 module.exports  = Messages;
  