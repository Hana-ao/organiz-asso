class Messages {
    constructor(db) {
        this.db = db;
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
            return messages ; // Retourne la liste de tous les utilisateurs
        } catch (error) {
            throw new Error("Erreur lors de la récupération de la liste des messages : " + error.message);
        }
    }
    // Fonction pour créer un nouveau message
    createMessage(messageData) {
        return new Promise((resolve, reject) => {
            this.db.collection("messages").insertOne(messageData, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.ops[0]);
                }
            });
        });
    }

    // Fonction pour supprimer un message
    deleteMessage(messageId) {
        return new Promise((resolve, reject) => {
            this.db.collection("messages").deleteOne({ _id: messageId }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Autres méthodes à ajouter selon les besoins
  }
  
 module.exports  = Messages;
  