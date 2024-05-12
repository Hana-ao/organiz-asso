const Users = require('./users.js');
const { ObjectId } = require('mongodb');

class Requests {
  constructor(db) {
    this.db = db;
    this.users = new Users(db);
  }


 

  // Fonction pour créer une nouvelle demande
  createRequest(requestData) {

    return new Promise((resolve, reject) => {
      // Code pour créer une nouvelle demande avec les données spécifiées dans la base de données

      
      this.db.collection("requests").insertOne(requestData, (err,result) => {
        if(err){
          reject(err);
        }else{
          const newRequest= {
            id: result.insertedId, //on utilise l'id généré par la bd
            ...requestData
          }
          resolve(newRequest);
        }

      })
      
    });
  }

  async acceptRequest(request_id){
    try{
      
     
        const request = await this.db.collection('requests').findOne({_id : new ObjectId(request_id)});
        
        const {name, lastName, login, email, password} = request;
        


        const newUserCreatedID = await this.users.create(name,lastName,login,email,password); //on peut enfin créer le user
        // newUserCreatedID contient l'ID de l'utilisateur créé

        console.log("Nouvel utilisateur créé :", newUserCreatedID);

        await this.deleteRequest(request_id);//une fois que le user a été créé, on supprime sa demande d'inscription de la liste

        return newUserCreatedID;
    }
    catch{
      throw new Error("Erreur lors de l'acceptation de l'inscription de l'utilisateur");
    }
  }

  async deleteRequest(request_id) {
    try {
        // Supprimer la demande avec l'ID spécifié de la base de données
        // Remplacer le code factice par la logique de base de données réelle
        const result = await this.db.collection("requests").deleteOne({ _id: new ObjectId(request_id) });
        return result.deletedCount === 1 ? request_id : null; // La propriété deletedCount de cet objet indique le nombre de documents supprimés.
    } catch (error) {
        throw new Error("Erreur lors de la suppression de la demande : " + error.message);
    }
}
  async getAllRequests() {
    try {
        const allRequests = await this.db.collection("requests").find().toArray();
        return allRequests;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la liste des demandes : " + error.message);
    }
}



}

module.exports = Requests;
