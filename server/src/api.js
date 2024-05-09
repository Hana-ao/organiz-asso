const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const Requests = require("./entities/requests.js");
const session = require('express-session');

function init(db) {
    console.log('init est lancé');
    const router = express.Router();

    router.use(express.json());

    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // Autoriser l'accès depuis n'importe quelle origine
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path); //pour print la méthode (POST, GET..) et le chemin de l'URL demandé dans la requete
        console.log('Body', req.body); // et ce que contient la req
        next();
    });
    console.log('jusquici tout va bien');

    const users = new Users(db); //création d'une instance de la classe Users + connexion à la bd

    console.log('user check');

    router.post("/user/register", async (req, res) => {
        console.log('bien rentré dans post');
        try {
            const { name, lastName, login, email, password } = req.body;
            console.log('tout est bien recupéré');

            if (!name || !lastName || !login || !email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Veuillez fournir tous les champs nécessaires pour l'inscription"
                });
            }
    

            //l'utilisateur n'a jamais été inscrit
            const userId = await users.create(name, lastName, login, email, password);
    
            // Réponse de succès
            return res.status(201).json({
                status: 201,
                message: "Inscription réussie !",
                user: userId // Renvoi de l'ID
            });
            
            
        } catch (error) {
            // Gestion des erreurs
            return res.status(500).json({
                status: 500,
                message: "Erreur lors de l'inscription",
                error: error.message
            });
        }
    });
    router.post("/user/login", async (req, res) => {

        console.log("fonction Login bien appelée")
        try {
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Requête invalide : nom d'utilisateur et mot de passe nécessaires"
                });
            }
    
            // Vérifier si l'utilisateur existe déjà
            const userExists = await users.exists(login);
            if (!userExists) {
                console.log("L'utilisateur n'existe pas dans la bdd");
                return res.status(404).json({
                    status: 404,
                    message: "Nom d'utilisateur invalide"
                });
            }
            const userData = await users.getUserDataByUsername(login);
            console.log("Voyons si userData contient qlq chose : " + userData);

            // Envoyer une réponse 200 OK si l'utilisateur existe
            return res.status(200).json({
                status: 200,
                message: "Utilisateur trouvé",
                user: userData
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: error.message
            });
        }
    });


    router.route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
            try {
                const user = await users.get(req.params.user_id);
                if (!user) {
                    res.sendStatus(404);
                } else {
                    res.send(user);
                }
            } catch (e) {
                res.status(500).send(e);
            }
        })
        .delete((req, res) => res.send(`delete user ${req.params.user_id}`));

    router.post("/user", (req, res) => {
        const { login, email, password, lastname, firstname } = req.body;
        if (!login || !email || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, email, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });



    //-------------------------------------------------------------------------------------------------------//

    const messages = new Messages(db);

    router.get("/message/:message_id", async (req, res) => {
        try {
            const message = await messages.getMessage(req.params.message_id);
            if (!message) {
                return res.sendStatus(404);
            }
            return res.send(message);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    router.post("/message", async (req, res) => {
        
        const message = req.body ; 
        if (!message) {
            res.status(400).send("Missing fields");
        } else {
            messages.createMessage(message)
                .then((message_id) => res.status(201).send({ id: message_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    router.delete("/message/:message_id", async (req, res) => {
        try {
            await messages.deleteMessage(req.params.message_id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    router.get("/messages", async (req, res) => {
        console.log("route bien trouvée");

        try {
            const allMessages = await messages.getAllMessages();
            //console.log(allMessages);
            return res.send(allMessages);
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    //-------------------------------------------------------------------------------------------------------//
   
    const requests = new Requests(db); // Création d'une instance de la classe Requests, sans ajouter default


    router.post("/request", async (req, res) => {
        console.log("Rentré dans post request")
        try{
            const requestUser = req.body ; //on récupère les infos du user, on le cherche dans la base de données
            //on essaie de récupèrer son id, grâce à son login ? 
            //getUserDataBylogin(users.login); 

            const newRequest = await requests.createRequest(requestUser); //créé une nouvelle demande d'inscription avec les données de l'utilisateur
            //Envoi d'une réponse au frontend pour indiquer que la demande a été créée avec succès
            //on envoi un code d'état, on utilise status. si on voulait envoyer des datas, on utilise res.send
            res.status(201).json({
                message:"Nouvelle demande d'inscription créée avec succès",
                request: newRequest
        });
        }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
    })
  
    
    
    router.delete("/request/:request_id/reject", async (req, res) => {
        try {
            await requests.deleteRequest(req.params.request_id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post("/request/:request_id/accept", async (req, res) => {
        console.log("Rentré dans la route de request accept");
        try {
            console.log("Rentré dans le try de request accept");
            const newUserCreatedID = await requests.acceptRequest(req.params.request_id);
            
            res.status(201).json({
                status: 201,
                message: "Inscription acceptée !",
                user: newUserCreatedID // Renvoi de l'ID
            });
        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get("/requests", async (req, res) => {
        console.log("Rentré dans GET all requests")

        try {
            const allRequests = await requests.getAllRequests();
            //console.log("AFFICHAGE DE TOUTES LES REQUETES : " + allRequests);
            res.send(allRequests);
        } 
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}
module.exports = init;
